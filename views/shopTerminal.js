define([
    'libs/text!templates/shopTerminal.html'
], function (shopTerminalTpl) {
    var ShopTerminalView = Backbone.View.extend({
        el: "#shopTerminal",
        template: shopTerminalTpl,
        initialize: function(opts) {
            this.catalogItems = new Backbone.Collection(opts.shopCatalogItems);
            this.shopCartItemCountPerSku = new Backbone.Model(opts.shopCartItemCountPerSku);
        },
        render: function() {
            $(this.el).html(_.template(this.template));
        },
    });

    return ShopTerminalView;
});