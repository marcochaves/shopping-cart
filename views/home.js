define([
    'libs/text!templates/home.html'
], function (homeTpl) {
    return Backbone.View.extend({
        el: "#content",
        template: homeTpl,
        initialize: function() {
        },
        render: function() {
            $(this.el).html(_.template(this.template));
        }
    });
});