define([
    'utils',
    'views/standardView',
    'libs/text!templates/shopCart.html',
], function (utils, StandardView, tmpl) {
    return StandardView.extend({
        el: "#shopCart",
        template: tmpl,
        events: {
            'click .handle-quantity-adjust': 'quantityAdjust',
        },
        initialize: function (opts) {
            this.catalogItems = opts.catalogItems || [];

            this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
            var catalogData = this.catalogItems.toJSON();
            var modelData = this.hydrateModel(catalogData);
            var html = this.renderTemplate(modelData);
            this.$el.html(html);
        },
        quantityAdjust: function (e) {
            var sku;
            var quantity;
            var shouldIncr;
            var $el;
            e.preventDefault();

            $el = $(e.currentTarget);
            sku = $el.data('sku');
            shouldDecr = $el.hasClass('handle-quantity-decr');

            quantity = this.model.get(sku) || 0;
            quantity += shouldDecr ? -1 : 1;

            if (quantity < 1) {
                this.model.unset(sku);
            } else {
                this.model.set(sku, quantity);
            }
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