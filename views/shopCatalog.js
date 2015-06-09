define([
    'utils',
    'views/standardView',
    'libs/text!templates/shopCatalog.html',
], function (utils, StandardView, shopCatalogTpl) {
    return StandardView.extend({
        el: "#shopCatalog",
        template: shopCatalogTpl,
        events: {
            'click .handle-add-to-cart': 'addToCart',
        },
        initialize: function() {
            this.listenTo(this.collection, 'change', this.render);
        },
        render: function() {
            var itemsData = this.collection.map(function (item) {
                var itemData = item.toJSON();
                return utils.hydrateCatalogItem(itemData);
            }.bind(this));
            var html = this.renderTemplate({items: itemsData});
            this.$el.html(html);
        },
        addToCart: function (e) {
            var sku;
            var $el;
            e.preventDefault();

            $el = $(e.currentTarget);
            sku = $el.data('sku');
            this.trigger('scan', sku, 1);
        },
    });
});