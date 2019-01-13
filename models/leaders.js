const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var leadersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    },
    designation: {
        type: String,
        require: true
    },
    abbr: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        require: true
    }

}, {
    timestamps: true
});

var promotionsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    },
    designation: {
        type: String,
        require: true
    },
    abbr: {
        type: Currency,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    features: {
        type: Boolean,
        require: true
    }

}, {
    timestamps: true
});




const Leaders = mongoose.model('Leader', leadersSchema);

module.exports = Leaders;




