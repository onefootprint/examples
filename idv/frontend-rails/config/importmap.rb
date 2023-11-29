# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@onefootprint/footprint-js", to: "https://ga.jspm.io/npm:@onefootprint/footprint-js@3.8.0/dist/footprint-js.js"
pin "@onefootprint/postmate", to: "https://ga.jspm.io/npm:@onefootprint/postmate@2.1.0/build/postmate.es.js"

pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"