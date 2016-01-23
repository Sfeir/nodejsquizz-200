'use strict';

var chai = require('chai'),
    nock = require('nock');
var assert = chai.assert;
var capitals = require('../services/capitals.service');

describe('capitalsService', function () {

    describe('getCapitals', function () {
        it('should return capitals', function (done) {

            nock('http://localhost:4000')
                .get('/capitals')
                .reply(200, [{ 'country': 'Samoa', 'city': 'Aspia' }, { 'country': 'Venezuela', 'city': 'Caracas' }]);

            capitals.getCapitals(function (err, capitals) {
                console.log(capitals);

                assert.equal(2, capitals.length);

                done();
            });
        });

        it('should return error if wrong status code', function (done) {

            nock('http://localhost:4000')
                .get('/capitals')
                .reply(500);

            capitals.getCapitals(function (err) {
                if (err) {
                    done();
                } else {
                    done(new Error('should be in error'));
                }
            });
        });

        it('should return error if timeout', function (done) {

            nock('http://localhost:4000')
                .get('/capitals')
                .delayConnection(1500)
                .reply(200, [{ 'country': 'Samoa', 'city': 'Aspia' }, { 'country': 'Venezuela', 'city': 'Caracas' }]);

            capitals.getCapitals(function (err) {
                if (err) {
                    done();
                } else {
                    done(new Error('should be in error'));
                }
            });
        });
    });
});
