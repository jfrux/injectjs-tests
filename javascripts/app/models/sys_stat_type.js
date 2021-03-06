/*! app/models/sys_stat_type 
* 	@requires: app,app/model
* 	@extends: app.Model
* 	@exports: app.models.Sys_stat_type
*/
define("app/models/Sys_stat_type",function(require,app) {
	app.models.Sys_stat_type = app.Model.extend({
			url: function() {
				base = "/api/sys_stat_types/"
                
                if(this.isNew()) {
                    return base
                } else {
                    return base + this.id
                }
			}
		});

	exports.app = app;
});
