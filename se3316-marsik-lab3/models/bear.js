const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BearSchema = new Schema(
    {
        name:{
            type: String,
            required: [true, 'Name field is required']
        },
        type:{
            type: String,
            required: [true, 'Type field is required']
        },
        loanPeriod:{
            type: Number,
            default: false
        },
        quantity:{
            type: Number,
            default: false
        }
    });

const Bear = mongoose.model('bear', BearSchema);

module.exports = Bear;