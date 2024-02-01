#!/usr/bin/env bash

set -eu

repo_uri="https://x-access-token:$DEPENDENCIES_TOKEN@github.com/$GITHUB_REPOSITORY.git"
remote_name="origin"
main_branch="master"
target_branch="dependencies-latest"

cd "$GITHUB_WORKSPACE"

git config user.name "$GITHUB_ACTOR"
git config user.email "$GITHUB_ACTOR@bots.github.com"

# start out with a pristine target branch
git checkout -B "$target_branch"
git reset --hard "$remote_name/$main_branch"

sh ./update-versions.sh

git commit -m "updated dependencies"
if [ "$?" != "0" ]; then
	echo "nothing to commit"
	exit 0
fi

git remote set-url "$remote_name" "$repo_uri"
git push --force-with-lease "$remote_name" "$target_branch"

api_request() {
	method="$1"
	shift
	path="$1"
	shift
	curl -u "$DEPENDENCIES_USER:$DEPENDENCIES_TOKEN" -X "$method" "$@" \
			"https://api.github.com/repos/${GITHUB_REPOSITORY}${path}"
}

# determine whether an open pull request already exists
org=`echo "$GITHUB_REPOSITORY" | sed 's#/.*##'`
api_request GET "/pulls?state=open&head=$org:$target_branch" > prs.json
pr=`node -p -e 'let prs = require("./prs.json"); prs.length > 0 && prs[0].number'`
if [ "$pr" != "false" ]; then
	# add comment to existing PR
	api_request POST "/issues/$pr/comments" --data-binary @- <<EOF
{
	"body": "🤖 dependencies updated"
}
EOF
	exit 0
fi
# create pull request
api_request POST "/pulls" --data-binary @- <<EOF
{
	"title": "automated dependencies update",
	"head": "$target_branch",
	"base": "$main_branch"
}
EOF