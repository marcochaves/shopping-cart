require([
    'views/shopCatalog',
    'views/shopTerminal',
    'views/shopCart',
], function (ShopCatalog, ShopTerminalView, ShopCartView) {
    var ApplicationRouter = Backbone.Router.extend({
        routes: {
            "": "home",
        },
        initialize: function() {
            this.shopTerminalView = new ShopTerminalView();
            this.shopTerminalView.render();
            this.shopCartView = new ShopCartView();
            this.shopCartView.render();
            this.shopCatalog = new ShopCatalog();
            this.shopCatalog.render();
        },
        home: function() {
        }
    });

    app = new ApplicationRouter();
    Backbone.history.start();
});