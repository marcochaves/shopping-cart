define([
    'libs/text!templates/header.html'
], function (headerTpl) {
    return Backbone.View.extend({
        el: "#header",
        template: headerTpl,
        initialize: function() {
        },
        render: function() {
            $(this.el).html(_.template(this.template));
        }
    });
});