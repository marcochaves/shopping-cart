require([
    'views/shopCatalog',
    'views/shopTerminal',
    'views/shopCart',
    'sampleData',
], function (ShopCatalogView, ShopTerminalView, ShopCartView, sampleData) {
    var ApplicationRouter = Backbone.Router.extend({
        routes: {
            "": "home",
        },
        initialize: function() {
            this.shopTerminalView = new ShopTerminalView(sampleData);

            // to keep things simple, keep these views flat instead of letting the shopTerminal own them,
            // but let them share shopTerminal's models.
            this.shopCatalogView = new ShopCatalogView({
                collection: this.shopTerminalView.catalogItems,
            });

            this.shopCartView = new ShopCartView({
                model: this.shopTerminalView.shopCartItemCountPerSku,
                catalogItems: this.shopTerminalView.catalogItems,
            });

            this.shopCatalogView.render();
            this.shopCartView.render();
            this.shopTerminalView.render();

            //temp expose for debugging;
            window.app = this;
        },
        home: function() {
        }
    });

    app = new ApplicationRouter();
    Backbone.history.start();
});