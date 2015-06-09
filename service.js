define([
    'utils',
    'sampleData',
], function (utils, sampleData) {
    var data = sampleData;
    var catalogItemCollection = new Backbone.Collection(data.shopCatalogItems);
    var shopCartItemsModel = new Backbone.Model(data.shopCartItemsPerSku);

    // an object to hold a quick-and-dirty interface
    var terminal = {
        /*
         * Scans an item into the cart
         * optAmount defaults to 1, but it can be any integer including a negative.
        */
        scan: function (sku, optAmount) {
            var model = shopCartItemsModel;
            var catalog = catalogItemCollection;
            var quantity = model.get(sku) || 0;
            var isInCatalog = !!catalog.findWhere({sku: sku});
            var newQuantity = quantity + (optAmount || 1);

            // validate
            if (!isInCatalog) {
                throw 'That product code is not in the catalog.';
            }
            if (newQuantity < 0) {
                throw 'Sorry, you can\'t remove more items than you have in the cart.';
            }

            if (newQuantity < 1) {
                model.unset(sku);
            } else {
                model.set(sku, newQuantity);
            }
            return model;
        },
        /*
         * Clears the cart
        */
        clear: function () {
            shopCartItemsModel.clear();
        },
        /*
         * Runs a sample checkout
         * (quick-and-dirty-unit testing)
        */
        checkout: function (skus) {
            terminal.clear();

            _(skus).each(function (sku) {
                terminal.scan(sku);
            });

            var x = utils.calcTotalPrice(shopCartItemsModel.toJSON());
            debugger;
        },
    };

    return _({}).extend(Backbone.Events, {
        // just expose the models directly to keep it simple.
        // let the views edit and listen to the shared models rather than abstracting to a proper async api
        // If this were a more proper app we'd protect against sharing this much scope with direct access.
        catalogItemCollection: catalogItemCollection,
        shopCartItemsModel: shopCartItemsModel,
        terminal: terminal,
    });
});