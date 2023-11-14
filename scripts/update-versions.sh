#!/bin/bash

# A script that update footprint related dependencies in example projects

# List of packages to update
packages=(
  "@onefootprint/footprint-js"
  "@onefootprint/footprint-react"
  "@onefootprint/footprint-react-native"
  "@onefootprint/footprint-expo"
)

# Function to check if a directory matches the pattern
matches_pattern() {
  local dir_name=$(basename "$1")  # Extract the directory name
  [[ "$dir_name" == frontend-* || "$dir_name" == mobile-* ]]
}

# Function to check if a package is a dependency
has_dependency() {
  npm ls "$1" > /dev/null 2>&1
}

# Function to update a package to the latest version
update_package() {
  local package="$1"
  if has_dependency "$package"; then
    echo "$package is a dependency. Updating to the latest version..."
    npm remove "$package"
    npm add "$package"
    npm install "$package"
  else
    echo "$package is not a dependency. Skipping update."
  fi
}


# Function to process each directory
process_directory() {
  if matches_pattern "$1"; then
    echo "Processing directory: $1"

    # Change to the directory
    cd "$1" || { echo "Error: Could not change to directory $1"; exit 1; }
    
    # Update each package in the list
    for package in "${packages[@]}"; do
      update_package "$package"
    done
    
   # Return to the original directory
    cd - || { echo "Error: Could not change back to the original directory"; exit 1; }
  fi
}

# Recursively search for directories and process them
find_directories() {
  local current_dir="$1"
  for dir in "$current_dir"/*; do
    if [[ -d "$dir" ]]; then
      process_directory "$dir"
    fi
  done
}

# Start processing
find_directories ../idv
find_directories ../auth

echo "Script execution completed."
