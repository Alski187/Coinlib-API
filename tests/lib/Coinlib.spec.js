//Modules
const fs = require('fs');
const mocha = require('mocha');
const chai = require('chai');
var should = chai.should();

//Helpers
const Coinlib = require('../../lib/Coinlib');

const shared = require('../shared');

const API_KEY = '<%ENTER_YOUR_COINLIB_API_KEY_HERE%>';

describe('Coinlib', function () {
    beforeEach(function (done) {
        this.CoinlibClient = new Coinlib(API_KEY);

        done();
    });

    describe('global', function () {
        beforeEach(function (done) {
            this.CoinlibClient.global().then((data) => {
                this.data = data;
                done();
            });
        });

        shared.shouldBeAValidRequest();
    });

    describe('coins', function () {
        describe('list', function () {
            beforeEach(function (done) {
                this.CoinlibClient.coins.list().then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });

        describe('fetchInfo', function () {
            beforeEach(function (done) {
                this.CoinlibClient.coins.fetchInfo('BTC').then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });
    });
});