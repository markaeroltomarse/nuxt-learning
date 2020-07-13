const mongoose = require('mongoose')
const moment = require('moment')


let today = moment().format('MMMM Do YYYY, h:mm:ss a');
let yesterday =  moment().subtract(1, "days").format('MMMM Do YYYY, h:mm:ss a') - 1;

module.exports = mongoose.Schema({
    course:String,
    name:String,
    code:String,
    units:Number,
    desc:String,
    year:String,
    sem:String,
    subimg:String,
    studentyear:String,
    enrolled:{
        type:[String],
        default:[],
        required:false
    },
    assignTeachers:{
        type:[String],
        default:[],
        required:false
    },
    config:{
        posting:{
            type:Boolean,
            default:true,
            required:false,
        },
        enrollment:{
            type:Boolean,
            default:true,
            required:false,
        }
    }
})