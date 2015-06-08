define([
    'views/standardView',
    'libs/text!templates/shopTerminal.html'
], function (StandardView, shopTerminalTpl) {
    var ShopTerminalView = StandardView.extend({
        el: "#shopTerminal",
        template: shopTerminalTpl,
        initialize: function() {
        },
        render: function() {
            var html = this.renderTemplate();
            this.$el.html(html);
        },
    });

    return ShopTerminalView;
});