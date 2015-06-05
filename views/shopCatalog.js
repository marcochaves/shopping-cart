define([
    'libs/text!templates/shopCatalog.html'
], function (shopCatalogTpl) {
    return Backbone.View.extend({
        el: "#shopCatalog",
        template: shopCatalogTpl,
        initialize: function() {
        },
        render: function() {
            $(this.el).html(_.template(this.template));
        }
    });
});