define([
    'libs/text!templates/shopCart.html'
], function (shopCartTpl) {
    return Backbone.View.extend({
        el: "#shopCart",
        template: shopCartTpl,
        render: function() {
            this.$el.html(_.template(this.template));
        }
    });
});