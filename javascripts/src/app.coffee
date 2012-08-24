define "app",(require) ->
    $ = require("jquery")
    Backbone = require("backbone")
    Backbone.Paginator = require("backbone.paginator")
    require("bootstrap")

    class App extends Backbone.View
        constructor:->
            @$win = window
            @$doc = @$win.document
            @$body = @$doc.body
            @el = $("#app")

    app = new App()
    
    Backbone.Paginator.clientPager.prototype.whereExpanded = (attrs) ->
        return _.filter @origModels, (model) ->
            for key of attrs
                return false unless attrs[key] is model.get(key)
            true

    Backbone.emulateJSON = true

    # app.on("loaded", ->
    #     ce.log.info("app: started")
    # )
    console.log "test"
    exports.app = app
    return