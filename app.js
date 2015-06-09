require([
    'views/shopCatalog',
    'views/shopTerminal',
    'views/shopCart',
    'service',
], function (ShopCatalogView, ShopTerminalView, ShopCartView, service) {
    var ApplicationRouter = Backbone.Router.extend({
        // not using actual routes for this one...
        routes: {
            "": "home",
        },
        initialize: function() {
            //init Views
            var shopTerminalView = new ShopTerminalView();
            var shopCatalogView = new ShopCatalogView({
                collection: service.catalogItemCollection,
            });
            var shopCartView = new ShopCartView({
                model: service.shopCartItemsModel,
                catalogItemCollection: service.catalogItemCollection,
            });

            // render views.  Keep it simple for this and don't nest views under an app parent view.
            shopCatalogView.render();
            shopCartView.render();
            shopTerminalView.render();

            // Quick hook up to let the views trigger up to the terminal's API.
            // It might be cleaner to just give the views access to the terminal instead.
            service.listenTo(shopCartView, 'scan', service.terminal.scan);
            service.listenTo(shopCatalogView, 'scan', service.terminal.scan);

            // expose the service's terminal
            window.terminal = service.terminal;
        },
        home: function() {}
    });

    app = new ApplicationRouter();
    Backbone.history.start();
});