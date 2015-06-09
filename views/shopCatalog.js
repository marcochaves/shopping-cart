define([
    'utils',
    'views/standardView',
    'libs/text!templates/shopCatalog.html',
], function (utils, StandardView, shopCatalogTpl) {
    return StandardView.extend({
        el: "#shopCatalog",
        template: shopCatalogTpl,
        events: {
            'click .handle-quantity-adjust': 'quantityAdjust',
        },
        initialize: function() {
        },
        render: function() {
            var itemsData = this.collection.map(function (item) {
                var itemData = item.toJSON();
                return utils.hydrateCatalogItem(itemData);
            }.bind(this));
            var html = this.renderTemplate({items: itemsData});
            this.$el.html(html);
        },
    });
});