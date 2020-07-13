const mongoose = require('mongoose')
const moment = require('moment')


let today = moment().format('MMMM Do YYYY, h:mm:ss a');
let yesterday =  moment().subtract(1, "days").format('MMMM Do YYYY, h:mm:ss a') - 1;

module.exports = mongoose.Schema({
    name:String,
    code:String,
    courseimg:String,
    first:{
        type:[Object],
        required:false,
    },
    second:{
        type:[Object],
        required:false,
    },
    third:{
        type:[Object],
        required:false,
    },
    fourth:{
        type:[Object],
        required:false,
    },
    enrolled:{
        type:[String],
        required:false
    },
    created:{
        type:String,
        default:today
    }
})