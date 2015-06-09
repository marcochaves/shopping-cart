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
            this.catalogItemCollection = service.catalogItemCollection;
            this.shopCartItemsModel = service.shopCartItemsModel;

            //init Views
            this.shopTerminalView = new ShopTerminalView({
                // shopCartItemsModel: this.shopCartItemsModel,
                // catalogItemCollection: this.catalogItemCollection,
            });

            this.shopCatalogView = new ShopCatalogView({
                collection: this.catalogItemCollection,
            });
            this.shopCartView = new ShopCartView({
                model: this.shopCartItemsModel,
                catalogItemCollection: this.catalogItemCollection,
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