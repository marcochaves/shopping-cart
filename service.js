define([
    'sampleData',
], function (sampleData) {
    var data = sampleData;
    return {
        catalogItems: new Backbone.Collection(data.shopCatalogItems),
        shopCartItemCountPerSku: new Backbone.Model(data.shopCartItemCountPerSku),
    };
});