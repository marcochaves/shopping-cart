define([
    'libs/text!templates/shopCart.html'
], function (tmpl) {
    return Backbone.View.extend({
        el: "#shopCart",
        // template helper, abstract later
        template: (function () {
            Mustache.parse(tmpl);
            return function(data) {
                return Mustache.render(tmpl, data);
            };
        })(),
        initialize: function (opts) {
            this.catalogItems = opts.catalogItems || [];
        },
        render: function() {
            var shopCartItems = this.hydrateModel(this.catalogItems);
            var html = this.template({shopCartItems: shopCartItems});
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