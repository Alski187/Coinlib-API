/**
 * @description The base url for the Coinlib API
 * @kind constant
 */
const BASE = 'https://coinlib.io/api/';

/**
 * @description The host of the Coinlib API
 * @kind constant
 */
const HOST = 'coinlib.io';

/**
 * @description The current version for the Coinlib API
 * @kind constant
 */
const API_VERSION = '1';

/**
 * @description The Coinlib URI according to base and current version
 * @kind constant
 */
const URI = `${BASE}v${API_VERSION}`;

/**
 * @description The maximum number of requests per hour per endpoint for the Coinlib API
 * @kind constant
 */
const REQUESTS_PER_HOUR = {
    GLOBAL: 120,
    COINS: {
        LIST: 60,
        FETCH_INFO: 180,
    },
};

/**
 * @description The current accepted methods for Coinlib API calls
 * @kind constant
 */
const ACCEPTED_METHODS = [
    'GET',
];

/**
 * @description Available options to order results by
 * @kind constant
 */
const ORDER = {
    RANK_ASC: 'rank_asc', //Order by rank (ascending)
    RANK_DESC: 'rank_desc', //Order by rank (descending)
    VOLUME_ASC: 'volume_asc', //Order by volume (ascending)
    VOLUME_DESC: 'volume_desc', //Order by volume (descending)
    PRICE_ASC: 'price_asc', //Order by price (ascending)
    PRICE_DESC: 'price_desc', //Order by price (descending)
    DATE_ADDED_ASC: 'date_inserted_asc', //Order by date added (ascending)
    DATE_ADDED_DESC: 'date_inserted_desc', //Order by date added (descending)
};

//

module.exports = {
    BASE,
    HOST,
    API_VERSION,
    URI,
    REQUESTS_PER_HOUR,
    ACCEPTED_METHODS,
    ORDER,
};