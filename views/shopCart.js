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
                return itemData;
            }.bind(this));

            return {shopCartItems: shopCartItems};
        },
    });
});