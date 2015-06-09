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
         * Checks the cart's price
        */
        checkPrice: function () {
            var catalogData = catalogItemCollection.toJSON();
            var shoppingCartData = shopCartItemsModel.toJSON();
            var shopCartItems = utils.hydrateShopCartItems(shoppingCartData, catalogData);
            var totalPrice = utils.calcTotalPrice(shopCartItems);
            return totalPrice;
        },

        /*
         * Runs a sample checkout
        */
        checkout: function (skus) {
            terminal.clear();

            _(skus).each(function (sku) {
                terminal.scan(sku);
            });
        },

        /*
         * Runs some tests.
         * (quick-and-dirty pseudo unit testing)
        */
        test: function () {
            var tests = sampleData.tests;
            _(tests).each(function (test) {
                var totalPrice;
                terminal.checkout(test.scans);
                totalPrice = terminal.checkPrice();
                if (test.total !== totalPrice) {
                    throw 'Test failed!  The price should be ' + test.total + ' but is ' + totalPrice;
                }
            });
            alert('tests passed!');
        },
    };

    return _({}).extend(Backbone.Events, {
        // just expose the models directly to keep it simple.
        // let the views edit and listen to the shared models rather than abstracting to a proper async api
        // If this were a more proper app we might protect more against leaking this much scope.
        catalogItemCollection: catalogItemCollection,
        shopCartItemsModel: shopCartItemsModel,
        terminal: terminal,
    });
});