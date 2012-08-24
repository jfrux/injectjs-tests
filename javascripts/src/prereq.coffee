Inject.reset();
#Inject.enableDebug("logging");
Inject.setModuleRoot "/javascripts/"

# window.onerror = (message) ->
#   err = document.createElement "p";
#   err.innerHTML = message.replace("\n", "<br>");
#   output = document.getElementById 'error-output'
#   output.appendChild err
#   output.style.display = 'block'
#   return true

Inject.addRule /^jquery$/,
	path: "libs/jquery",
	pointcuts:
		after: ->
		  module.setExports(jQuery.noConflict())
		  #delete window["$"]
		  return

Inject.addRule /^bootstrap$/,
    path: "libs/bootstrap"
    pointcuts:
        before: ->
            $ = require("jquery")

Inject.addRule /^underscore$/, 
    path: "libs/underscore"

Inject.addRule /^backbone$/,
    path: "libs/backbone"

Inject.addRule /backbone\./,
    path: (module) ->
        return "libs/backbone/" + module
    pointcuts:
        before: () ->
            Backbone = require("backbone")

