require([
    'views/shopCatalog',
    'views/shopTerminal',
    'views/shopCart',
    'service',
], function (ShopCatalogView, ShopTerminalView, ShopCartView, service) {
    var ApplicationRouter = Backbone.Router.extend({
        // routes: {
        //     "": "home",
        // },
        initialize: function() {
            // init Models
            this.catalogItems = service.catalogItems;
            this.shopCartItemCountPerSku = service.shopCartItemCountPerSku;

            //init Views
            this.shopTerminalView = new ShopTerminalView({
                // shopCartItemCountPerSku: this.shopCartItemCountPerSku,
                // catalogItems: this.catalogItems,
            });

            this.shopCatalogView = new ShopCatalogView({
                collection: this.catalogItems,
            });
            this.shopCartView = new ShopCartView({
                model: this.shopCartItemCountPerSku,
                catalogItems: this.catalogItems,
            });

            // render views.  Keep it simple and don't nest views under an app view.
            this.shopCatalogView.render();
            this.shopCartView.render();
            this.shopTerminalView.render();

            //temp expose for debugging;
            window.app = this;
        },
        // home: function() {
        // }
    });

    app = new ApplicationRouter();
    Backbone.history.start();
});