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
            this.catalogItemCollection = opts.catalogItemCollection || [];

            this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
            var catalogData = this.catalogItemCollection.toJSON();
            var modelData = this.model.toJSON();
            var shopCartItems = utils.hydrateShopCartItems(modelData, catalogData);
            var html = this.renderTemplate({
                shopCartItems: shopCartItems,
                totalPriceDescription: this.getTotalPriceDescription(shopCartItems),
            });
            this.$el.html(html);
        },
        quantityAdjust: function (e) {
            var sku;
            var $el;
            var adjustment;
            e.preventDefault();

            $el = $(e.currentTarget);
            sku = $el.data('sku');
            shouldDecr = $el.hasClass('handle-quantity-decr');
            adjustment = shouldDecr ? -1 : 1;
            this.trigger('scan', sku, adjustment);
        },
        getTotalPriceDescription: function (shopCartItemsData) {
            var totalPrice = utils.calcTotalPrice(shopCartItemsData);
            return utils.formatMoney(totalPrice);
        },
        hydrateShopCartData: function (shopCartItemsModel, catalogData) {
            var items = _(shopCartItemsModel).map(function (quantity, key) {
                var item = _(catalogData).findWhere({sku: key});
                var itemData = utils.hydrateCatalogItem(item);
                itemData.quantity = quantity;
                return itemData;
            }.bind(this));

            return items;
        },
    });
});