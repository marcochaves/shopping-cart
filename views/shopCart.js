define([
    'views/standardView',
    'libs/text!templates/shopCart.html'
], function (View, tmpl) {
    return View.extend({
        el: "#shopCart",
        template: tmpl,
        initialize: function (opts) {
            this.catalogItems = opts.catalogItems || [];
        },
        render: function() {
            var shopCartItems = this.hydrateModel(this.catalogItems);
            var html = this.renderTemplate({shopCartItems: shopCartItems});
            this.$el.html(html);
        },
        hydrateModel: function (catalog) {
            var model = this.model;
            var shopCartItems = _(model.attributes).map(function (quantity, key) {
                var itemData = catalog.findWhere({sku: key}).toJSON();
                itemData.quantity = quantity;
                return itemData;
            });

            return shopCartItems;
        },
    });
});