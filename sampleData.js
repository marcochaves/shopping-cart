define(function() {
    var shopCatalogItems = [
        {
            sku: 'A',
            name: 'Shop Item A',
            unitPrice: 2,
            bulkPrice: {
                minItems: 4,
                unitPrice: 1.75,
            },
        },
        {
            sku: 'B',
            name: 'Shop Item B',
            unitPrice: 12,
        },
        {
            sku: 'C',
            name: 'Shop Item C',
            unitPrice: 1.25,
            bulkPrice: {
                minItems: 6,
                unitPrice: 1,
            },
        },
        {
            sku: 'D',
            name: 'Shop Item D',
            unitPrice: .15,
        },
    ];

    var shopCartItemsPerSku = {
        A: 4,
        B: 2,
        C: 1,
        D: 1,
    };

    return {
        shopCatalogItems: shopCatalogItems,
        shopCartItemsPerSku: shopCartItemsPerSku,
        tests: [
            {
                scans: ['A','B','C','D','A','B','A','A'],
                total: 32.40,
            },
            {
                scans: ['C','C','C','C','C','C','C'],
                total: 7.25,
            },
            {
                scans: ['A', 'B', 'C', 'D'],
                total: 15.40,
            },
        ],
    };
});