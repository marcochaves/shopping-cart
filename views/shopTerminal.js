define([
    'views/standardView',
    'utils',
    'libs/text!templates/shopTerminal.html',
], function (StandardView, utils, shopTerminalTpl) {
    var ShopTerminalView = StandardView.extend({
        el: "#shopTerminal",
        template: shopTerminalTpl,
        initialize: function(opts) {
            this.catalogItems = opts.catalogItems || [];
            this.shopCartItemCountPerSku = opts.shopCartItemCountPerSku || {};
        },
        render: function() {
            var catalogData = this.catalogItems.toJSON();
            var shopCartItemCountPerSku = this.shopCartItemCountPerSku.toJSON();
            // var shopCartItemsData = this.hydrateShopCartData(shopCartItemCountPerSku, catalogData);

            var data = {
                // totalPriceDescription: this.getTotalPriceDescription(shopCartItemsData),
            }
            var html = this.renderTemplate(data);
            this.$el.html(html);
        }
    });

    return ShopTerminalView;
});