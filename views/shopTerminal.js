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
            var shopCartItemsData = this.hydrateShopCartData(shopCartItemCountPerSku, catalogData);
            var data = {
                totalPriceDescription: this.getTotalPriceDescription(shopCartItemsData),
            }
            var html = this.renderTemplate(data);
            this.$el.html(html);
        },
        calcTotalPrice: function (shopCartItemsData) {
            var totalPrice = _(shopCartItemsData).map(function (item) {
                var bulk;
                var loosies;

                if (!item.hasBulkPricing) {
                    return item.quantity * item.unitPrice;
                }

                loosies = item.quantity % item.bulkPrice.minItems;;
                bulk = item.quantity - loosies;

                return (bulk * item.bulkPrice.unitPrice) + (loosies * item.unitPrice);
            }).reduce(function (memo, num) {
                return memo + num;
            }, 0);

            return totalPrice;
        },
        getTotalPriceDescription: function (shopCartItemsData) {
            var totalPrice = this.calcTotalPrice(shopCartItemsData);
            return utils.formatMoney(totalPrice);
        },
        hydrateShopCartData: function (shopCartItemCountPerSku, catalogData) {
            var items = _(shopCartItemCountPerSku).map(function (quantity, key) {
                var item = _(catalogData).findWhere({sku: key});
                var itemData = utils.hydrateCatalogItem(item);
                itemData.quantity = quantity;
                return itemData;
            }.bind(this));

            return items;
        },
    });

    return ShopTerminalView;
});