define([
    'utils',
    'views/standardView',
    'libs/text!templates/shopTerminal.html',
], function (utils, StandardView, shopTerminalTpl) {

    // Just instructions for using the terminal in the console.
    var ShopTerminalView = StandardView.extend({
        el: "#shopTerminal",
        template: shopTerminalTpl,
        initialize: function(opts) {},
        render: function() {
            var html = this.renderTemplate();
            this.$el.html(html);
        },
    });

    return ShopTerminalView;
});