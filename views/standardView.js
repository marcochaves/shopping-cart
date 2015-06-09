define(function () {
    return Backbone.View.extend({
        renderTemplate: function(data, tmpl) {
            data = data || {};
            tmpl = tmpl || this.template;
            return Mustache.render(tmpl, data);
        },
    });
});