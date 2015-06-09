define(function () {
    var utils = {
        formatMoney: function (money) {
            var formattedMoney;
            var currencyType = '$';
            var padding = 2
            money = parseFloat(money);
            formattedMoney = money.toFixed(padding).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');

            return currencyType + formattedMoney;
        },

        /**
         * Returns a string like:
         * '$5.00'
         * or
         * '$2.00 each or 3 for $3.00'
        */
        getPriceDescription: function (itemData) {
            var priceDescription = utils.formatMoney(itemData.unitPrice);
            var hasBulkPricing = !!itemData.bulkPrice;

            if (hasBulkPricing) {
                priceDescription +=
                    ' each or '
                    + itemData.bulkPrice.minItems + ' for '
                    + utils.formatMoney(itemData.bulkPrice.unitPrice * itemData.bulkPrice.minItems);
            }
            return priceDescription;
        },
        hydrateCatalogItem: function (itemData) {
            return _(itemData).defaults({
                hasBulkPricing: !!itemData.bulkPrice,
                priceDescription: utils.getPriceDescription(itemData),
            });
        },
    };

    return utils;
});