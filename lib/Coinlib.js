'use strict';

//Modules
const https = require('https');
const querystring = require('querystring');

//Helpers
const Utils = require('./helpers/utilities');
const Constants = require('./helpers/constants');
const ReturnObject = require('./helpers/ReturnObject');

/**
 * @class Coinlib
 * @author Mark Miscavage <markmiscavage@protonmail.com>
 * @description A Node.js wrapper for the Coinlib API with no dependencies. For more information, visit: https://coinlib.io/apidocs
 * @example
 *     const Coinlib = require('coinlib-api');
 *     const CoinlibClient = new Coinlib(API_KEY);
 * @public
 * @version 0.0.1
 * @license MIT
 * @kind class
 */
class Coinlib {

    /**
     * @description Coinlib constructor. Sets up initial variables for the class.
     * @constructor
     * @param {string} key - Coinlib API key
     * @returns Coinlib
     */
    constructor(key) {
        //Check if parameters are valid
        if (!Utils.isString(key) || Utils.isStringEmpty(key)) Utils._WARN_('Invalid parameter', 'key must be of type: String and greater than 0 characters.');

        //Set incoming params
        this._key = key;

        //Return Coinlib
        return this;
    };

    /**
     * @description Get key
     * @returns {string} key - Coinlib API key
     */
    get key() {
        return this._key;
    };

    /**
     * @description Set ket
     * @param {string} key - Coinlib API key
     */
    set key(key) {
        //Check if parameters are valid
        if (!Utils.isString(key) || Utils.isStringEmpty(key)) Utils._WARN_('Invalid parameter', 'key must be of type: String and greater than 0 characters.');

        //Set
        this._key = secret;
    };

     /**
     * @description Set Client ID
     * @function setKey
     * @param {string} key - Coinlib API key
     * @returns Coinlib
     */
    setKey(key) {
        //Check if parameters are valid
        if (!Utils.isString(key) || Utils.isStringEmpty(key)) Utils._WARN_('Invalid parameter', 'key must be of type: String and greater than 0 characters.');

        //Set
        this._key = key;

        //Return Coinlib
        return this;
    };

    /**
     * @description Global market stats
     * @function global()
     * @async
     * @param {object} params - Parameters to pass through to the request
     * @param {string} params.pref - Symbol to use for prices and other market values. Default is USD.
     * @returns {ReturnObject}
     */
    async global(params) {
        const method = 'GET';
        let path = `/global`;

        //Build options
        let options = this._buildRequestOptions(method, path, params);

        //Return request
        return this._request(options);
    };

    /**
     * @description Calls related to coins
     */
    get coins() {
        return {

            /**
             * @description List of supported coins
             * @function coins.list()
             * @async
             * @param {object} params - Parameters to pass through to the request
             * @param {string} params.pref [default: USD] - Symbol to use for prices and other market values
             * @param {number} params.page: Starting from 1. Per official documentation: 'For now we return 100 results per page, but this may change without warning.'
             * @param {string} params.order - Order results by Coinlib.ORDER[*]
             * @returns {ReturnObject}
             */
            list: async(params) => {
                const method = 'GET';
                let path = `/coinlist`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description Fetch a specific coin's information
             * @function coins.fetchInfo()
             * @async
             * @param {string|array} coinSymbols - Single coin symbol or a list of symbols
             * @param {object} params - Parameters to pass through to the request
             * @param {string} params.pref [default: USD] - Symbol to use for prices and other market values
             * @returns {ReturnObject}
             */
            fetchInfo: async(coinSymbols, params = {}) => {
                const method = 'GET';
                let path = `/coin`;

                //Coin symbols must exist
                if (coinSymbols == undefined) Utils._WARN_('Invalid parameter', 'coinSymbols must exist and be of type: String or Array');

                //If coinSymbols is an array, make into string
                if (Utils.isArray(coinSymbols)) {
                    coinSymbols = coinSymbols.join(',');
                }

                //Add coinSymbols to params
                params.symbol = coinSymbols;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },
        }
    }

    /**
     * @description Build options for https.request
     * @function _buildRequestOptions
     * @protected
     * @param {string} method - One of Coinlib.ACCEPTED_METHODS
     * @param {string} path - Relative path for API
     * @param {object} params - Object representing query strings for url parameters
     * @returns {Object} - {path, method, host, port} Options for request
     */
    _buildRequestOptions(method, path, params = {}) {
        //Transform to uppercase
        method = method.toUpperCase();

        //Must have key (_key)
        if (this._key == undefined) Utils._WARN_('Invalid parameter', 'You must specify a valid key before making requests');
        else params.key = this._key; //Set key

        //Stringify object params if exist
        if (Utils.isObject(params)) params = querystring.stringify(params);

        //Make relative path
        //Check if has params, append accordingly
        if (params == undefined) path = `/api/v${Constants.API_VERSION}${path}`;
        else path = `/api/v${Constants.API_VERSION}${path}?${params}`;

        console.log("path:", path);

        //Create options
        let options = {
            path,
            method,
            host: Constants.HOST,
            port: 443,
        };

        //Return options
        return options;
    };

    /**
     * @description Perform https request
     * @function _request
     * @protected
     * @param {object} options - https.request options (from _buildRequestOptions())
     * @returns {Promise} Body of https request data results
     */
    _request(options) {
        return new Promise((resolve, reject) => {
            //Perform request
            let req = https.request(options, (res) => {
                let body = [];

                //Set body on data
                res.on('data', (chunk) => {
                    body.push(chunk);
                });

                //On end, end the Promise
                res.on('end', () => {
                    try {
                        body = Buffer.concat(body);
                        body = body.toString();

                        //Check if page is returned instead of JSON
                        if (body.startsWith('<!DOCTYPE html>')) Utils._WARN_('Invalid request', 'There was a problem with your request. The parameter(s) you gave are missing or incorrect.');

                        //Attempt to parse
                        body = JSON.parse(body);
                    }
                    catch (error) {
                        reject(error);
                    };

                    //Create return object
                    resolve(
                        ReturnObject(
                            !(res.statusCode < 200 || res.statusCode >= 300),
                            res.statusMessage,
                            res.statusCode,
                            body,
                        )
                    );
                });
            });

            //On error, reject the Promise
            req.on('error', (error) => reject(error));

            //End request
            req.end();
        });
    };
};

//Set Constants
Coinlib.API_VERSION = Constants.API_VERSION;
Coinlib.REQUESTS_PER_HOUR = Constants.REQUESTS_PER_HOUR;
Coinlib.ACCEPTED_METHODS = Constants.ACCEPTED_METHODS;
Coinlib.ORDER = Constants.ORDER;

//

module.exports = exports = Coinlib;