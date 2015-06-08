// Note: Some folks prefer using a pattern like mixins instead of inheritence.
define(function () {
    return Backbone.View.extend({
        renderTemplate: function(data, tmpl) {
            data = data || {};
            tmpl = tmpl || this.template;
            return Mustache.render(tmpl, data);
        },
        hydrateCatalogItem: function (itemData) {
            return _(itemData).defaults({
                hasBulkPricing: !!itemData.bulkPrice,
            });
        },
    });
});