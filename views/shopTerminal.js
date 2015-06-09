define([
    'utils',
    'views/standardView',
    'libs/text!templates/shopTerminal.html',
], function (utils, StandardView, shopTerminalTpl) {
    var ShopTerminalView = StandardView.extend({
        el: "#shopTerminal",
        template: shopTerminalTpl,
        initialize: function(opts) {
            // this.catalogItems = opts.catalogItems || [];
            // this.shopCartItemsModel = opts.shopCartItemsModel || {};
        },
        render: function() {
            // var catalogData = this.catalogItems.toJSON();
            // var shopCartItemsModel = this.shopCartItemsModel.toJSON();
            // var shopCartItemsData = this.hydrateShopCartData(shopCartItemsModel, catalogData);

            var data = {
                // totalPriceDescription: this.getTotalPriceDescription(shopCartItemsData),
            }
            var html = this.renderTemplate(data);
            this.$el.html(html);
        }
    });

    return ShopTerminalView;
});