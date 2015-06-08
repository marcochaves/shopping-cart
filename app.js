require([
    'views/shopCatalog',
    'views/shopTerminal',
    'views/shopCart',
    'sampleData',
], function (ShopCatalogView, ShopTerminalView, ShopCartView, sampleData) {
    var ApplicationRouter = Backbone.Router.extend({
        // routes: {
        //     "": "home",
        // },
        initialize: function() {
            var data = sampleData;

            // init Models
            this.catalogItems = new Backbone.Collection(data.shopCatalogItems);
            this.shopCartItemCountPerSku = new Backbone.Model(data.shopCartItemCountPerSku);

            //init Views
            this.shopTerminalView = new ShopTerminalView();

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