# Coinlib API Client for Node.js

A Node.js wrapper for the Coinlib API with no dependencies.

## • Installation

Latest version: 1.0.1

`npm install coinlib-api`

## • Testing

`npm  test`

## • Coinlib API Documentation

For complete API documentation, up-to-date parameters, reponses and errors, please refer to https://coinlib.io/apidocs.

## • Getting your API Keys

Access to the Coinlib.com API requires a free account. Sign up at https://coinlib.io.

Log into your account and navigate to the profile settings page at https://coinlib.io/profile then find the "API" section at the bottom.

Fill in "Where will you use our API?" and then generate your API key.

## • Quick Start Example

```javascript
//1. Import coinlib-api
const Coinlib = require('coinlib-api');

//2. Initiate the Coinlib API Client with your API key
const CoinlibClient = new Coinlib(COINLIB_API_KEY);

//3. Make calls
var func = async() => {
  let data = await CoinlibClient.ping();
};
```

## • Setting your Initial Coinlib Parameters

You'll need to set up a few parameters before using the Coinlib module.
Upon instantiation, it's recommended to set the API Key.

### Key
The API Key is required to be set before making any valid requests.


#### Setting the Key
```javascript
CoinlibClient.setKey(COINLIB_API_KEY);
//Alternatively
CoinlibClient.key = COINLIB_API_KEY;
```

## • Constants

This module provides helper constants for use in calls.

___
#### • `Coinlib.ORDER`
Order results in specific calls by using one of the following values.

| Key | Usage | Description |
| --- | --- | --- |
`RANK_ASC` | `Coinlib.ORDER.RANK_ASC` | Order by Coinlib rank (ascending)
`RANK_DESC` | `Coinlib.ORDER.RANK_DESC` | Order by Coinlib rank (descending)
`VOLUME_ASC` | `Coinlib.ORDER.VOLUME_ASC` | Order by volume (ascending)
`VOLUME_DESC` | `Coinlib.ORDER.VOLUME_DESC` | Order by volume (descending)
`PRICE_ASC` | `Coinlib.ORDER.PRICE_ASC` | Order by price (ascending)
`PRICE_DESC` | `Coinlib.ORDER.PRICE_DESC` | Order by price (descending)
`DATE_ADDED_ASC` | `Coinlib.ORDER.DATE_ADDED_ASC` | Order by date added (ascending)
`DATE_ADDED_DESC` | `Coinlib.ORDER.DATE_ADDED_DESC` | Order by date added (descending)


___
## • Making Calls
All calls using the CoinlibClient are asynchronous.

All calls are returned in the following format:
```javascript
{
    success: Boolean,
    message: String,
    code: Number,
    data: Object
}
```

The Coinlib splits up the currently available calls outline in the official Coinlib API documentation into one parts. (Aside from the `global` call.)

| Namespace | Usage | Description |
| --- | --- | --- |
`coins` | `Coinlib.coins[...]` | Calls related to coins

___
### • Global
Global market stats.

#### `global()`
Retrieve global market stats.

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.pref`: `String` [default: `USD`] - Symbol to use for prices and other market values

Usage Example:
```javascript
let data = await CoinlibClient.global();
```

___
### • Coins
Calls related to coins.


#### `coins.list()`
List all supported coins with data - paginated by 100.

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.pref`: `String` [default: `USD`] - Symbol to use for prices and other market values
- `params.page`: `Number` - Starting from 1. Per official documentation: "For now we return 100 results per page, but this may change without warning."
- `params.order`: `String` - Order results by `Coinlib.ORDER[*]`
             
Usage Example:
```javascript
let data = await Coinlib.coins.list();
```

___
#### `coins.fetchInfo()`
Fetch a specific coin's information.

Params:

- `coinSymbols`: `String|Array` - (Required) Single coin symbol or a list of symbols.
- `params`: `Object` - Parameters to pass through to the request
- `params.pref`: `String` [default: `USD`] - Symbol to use for prices and other market values
             
Usage Example:
```javascript
let data = await Coinlib.coins.fetchInfo(['BTC', 'ETH']);
//
let data = await Coinlib.coins.fetchInfo('BTC', {
  pref: 'USD'
});
```

## • Say Hi

Find me on Gab: [@markmiscavage](https://gab.com/markmiscavage).

Tweet at me: [@markmiscavage](https://twitter.com/markmiscavage).

## • License

MIT License

Copyright (c) 2018 Mark Miscavage

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.