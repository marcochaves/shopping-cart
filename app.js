require([
    'views/shopCatalog',
    'views/shopTerminal',
    'views/shopCart',
    'service',
], function (ShopCatalogView, ShopTerminalView, ShopCartView, service) {
    var ApplicationRouter = Backbone.Router.extend({
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

            // render views.  Keep it simple and don't nest views under an app view.
            shopCatalogView.render();
            shopCartView.render();
            shopTerminalView.render();

            // quick-and-dirty hook up to let view trigger up events to the terminal's api.
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