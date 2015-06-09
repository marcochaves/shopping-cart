define([
    'views/standardView',
    'utils',
    'libs/text!templates/shopCart.html',
], function (StandardView, utils, tmpl) {
    return StandardView.extend({
        el: "#shopCart",
        template: tmpl,
        initialize: function (opts) {
            this.catalogItems = opts.catalogItems || [];
        },
        render: function() {
            var catalogData = this.catalogItems.toJSON();
            var modelData = this.hydrateModel(catalogData);
            var html = this.renderTemplate(modelData);
            this.$el.html(html);
        },
        hydrateModel: function (catalogData) {
            var modelData = this.model.toJSON();
            var shopCartItems = _(modelData).map(function (quantity, key) {
                var item = _(catalogData).findWhere({sku: key});
                var itemData = utils.hydrateCatalogItem(item);

                itemData.quantity = quantity;
                itemData.priceDescription = utils.formatMoney(this.calcTotalItemPrice(itemData));

                return itemData;
            }.bind(this));

            return {
                shopCartItems: shopCartItems,
                totalPriceDescription: this.getTotalPriceDescription(shopCartItems),
            };
        },
        calcTotalItemPrice: function (item) {
            var bulk;
            var loosies;

            if (!item.hasBulkPricing) {
                return item.quantity * item.unitPrice;
            }

            loosies = item.quantity % item.bulkPrice.minItems;
            bulk = item.quantity - loosies;

            return (bulk * item.bulkPrice.unitPrice) + (loosies * item.unitPrice);
        },
        calcTotalPrice: function (shopCartItemsData) {
            var totalPrice = _(shopCartItemsData)
                .map(this.calcTotalItemPrice)
                .reduce(function (memo, num) {
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
});