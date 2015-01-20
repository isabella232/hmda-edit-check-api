'use strict';

var fs = require('fs');
var async = require('async');
var mongoose = require('mongoose');

var models_path = __dirname + '/../models';
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
});

var TestData = {
    build: function(done) {
        console.log('Inserting test data...');
        async.series([
            function(cb) {
                mongoose.model('CraReporters').create(
                    {'activity_year': '2013', 'respondent_id': '0000000001', 'agency_code': '1', 'respondent_name': 'foo' },
                function(err, item) {
                    cb();
                });
            },
            function(cb) {
                mongoose.model('Panel').create([
                    { 'activity_year': '2013', 'respondent_id': '0000000001', 'other_lender_code': '0', 'parent_name': 'foo'},
                    { 'activity_year': '2013', 'respondent_id': '0000000002', 'other_lender_code': '0', 'parent_name': ''},
                    { 'activity_year': '2013', 'respondent_id': '0000000003', 'other_lender_code': '1', 'parent_name': 'foo'},
                    { 'activity_year': '2013', 'respondent_id': '0000000004', 'other_lender_code': '1', 'parent_name': ''}
                ],
                function(err, item) {
                    cb();
                });
            },
            function(cb) {
                mongoose.model('Census').create([{'activity_year': '2013', 'type':'msa','code': '35100',
                    'state' : [
                        { 'fips_code' : '37', 'name' : 'North Carolina' }
                    ],
                    'county' : [
                        { 'fips_code' : '103', 'name' : 'Jones', 'small_county':'1'},
                        { 'fips_code' : '049', 'name' : 'Craven', 'small_county':'0' },
                        { 'fips_code' : '137', 'name' : 'Pamlico', 'small_county':'1' }
                    ],
                    'tract' : [ '9502.01', '9610.02', '9610.01', '9604.02', '9602.00', '9203.00',
                                '9607.00', '9501.02', '9613.03', '9604.04', '9604.01', '9612.02',
                                '9601.01', '9606.00', '9609.00', '9605.00', '9604.03', '9608.00',
                                '9612.01', '9603.00', '9601.02', '9202.00', '9613.01', '9611.00',
                                '9613.02', '9201.00', '9502.02', '9501.01'
                    ]},
                    { 'type' : 'state', 'activity_year' : '2013', 'code' : '37', 'name' : 'North Carolina',
                      'county' : [
                          { 'fips_code' : '103', 'name' : 'Jones', 'small_county':'1'},
                          { 'fips_code' : '049', 'name' : 'Craven', 'small_county':'0' },
                          { 'fips_code' : '137', 'name' : 'Pamlico', 'small_county':'1' }
                      ],
                      'tract' : [ '9502.01', '9610.02', '9610.01', '9604.02', '9602.00', '9203.00',
                                  '9607.00', '9501.02', '9613.03', '9604.04', '9604.01', '9612.02',
                                  '9601.01', '9606.00', '9609.00', '9605.00', '9604.03', '9608.00',
                                  '9612.01', '9603.00', '9601.02', '9202.00', '9613.01', '9611.00',
                                  '9613.02', '9201.00', '9502.02', '9501.01'
                      ]
                    },
                    {'activity_year': '2013', 'type':'county','code': '01035', 'small_county':'1'},
                    {'activity_year': '2013', 'type':'county','code': '37103', 'small_county':'1'},
                    {'activity_year': '2013', 'type':'county','code': '37049', 'small_county':'0'},
                    {'activity_year': '2013', 'type':'county','code': '01039', 'small_county':'0'}
                ], 
                function(err, item) {
                  cb();
                });
            }
        ], function() {
              console.log('..done inserting test data');
              done();
           }
        );
    }
};

module.exports = TestData;