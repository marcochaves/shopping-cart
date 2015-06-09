define([
    'views/standardView',
    'utils',
    'libs/text!templates/shopCatalog.html',
], function (StandardView, utils, shopCatalogTpl) {
    return StandardView.extend({
        el: "#shopCatalog",
        template: shopCatalogTpl,
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