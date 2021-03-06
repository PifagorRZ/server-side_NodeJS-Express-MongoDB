const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


var promotionsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        require: true,
        min: 0
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




const Promotions = mongoose.model('Promotion', promotionsSchema);

module.exports = Promotions;
