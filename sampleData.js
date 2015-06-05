define(function() {
    var shopCatalogItems = [
        {
            sku: 'A',
            name: 'Shop Item A',
            unitPrice: 2,
            bulkPrice: {
                minItmes: 3,
                price: 1,
            },
        },
        {
            sku: 'B',
            name: 'Shop Item B',
            unitPrice: 5,
        },
    ];

    var shopCartItemCountPerSku = {
        A: 1,
        B: 4,
    };

    return {
        shopCatalogItems: shopCatalogItems,
        shopCartItemCountPerSku: shopCartItemCountPerSku,
    };
});