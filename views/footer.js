define([
    'libs/text!templates/footer.html'
], function (footerTpl) {
    return Backbone.View.extend({
        el: "#footer",
        template: footerTpl,
        render: function() {
            this.$el.html(_.template(this.template));
        }
    });
});