define(function() {
    var shopCatalogItems = [
        {
            sku: 'A',
            name: 'Shop Item A',
            unitPrice: 2,
            bulkPrice: {
                minItems: 3,
                unitPrice: 1,
            },
        },
        {
            sku: 'B',
            name: 'Shop Item B',
            unitPrice: 5,
        },
    ];

    var shopCartItemsPerSku = {
        A: 1,
        B: 4,
    };

    return {
        shopCatalogItems: shopCatalogItems,
        shopCartItemsPerSku: shopCartItemsPerSku,
    };
});