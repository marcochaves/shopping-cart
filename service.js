define([
    'sampleData',
], function (sampleData) {
    var data = sampleData;
    return {
        // just expose the models directly to keep it simple.
        // let the views edit and listen to the shared models rather than abstracting to a proper async api
        // If this were a more proper app we'd protect against sharing this much scope with direct access.
        catalogItemCollection: new Backbone.Collection(data.shopCatalogItems),
        shopCartItemsModel: new Backbone.Model(data.shopCartItemsPerSku),
    };
});