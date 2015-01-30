'use strict';

var mongoose = require('mongoose');

var transmittalSchema = mongoose.Schema({
    'activity_year': String,
    'respondent_id': String,
    'tax_id': String,
    'timestamp': Date
});

module.exports = mongoose.model('Transmittal', transmittalSchema, 'transmittal');
