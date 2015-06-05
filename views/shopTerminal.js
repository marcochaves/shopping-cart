define([
    'libs/text!templates/shopTerminal.html'
], function (shopTerminalTpl) {
    return Backbone.View.extend({
        el: "#shopTerminal",
        template: shopTerminalTpl,
        initialize: function() {
        },
        render: function() {
            $(this.el).html(_.template(this.template));
        }
    });
});