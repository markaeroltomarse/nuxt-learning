const mongoose = require('mongoose')
const moment = require('moment')


let today = moment().format('MMMM Do YYYY, h:mm:ss a');
let yesterday =  moment().subtract(1, "days").format('MMMM Do YYYY, h:mm:ss a') - 1;

module.exports = mongoose.Schema({
    
    subject:{
        type:Object,
        required:false
    },
    postedby:{
        type:String,
        required:false  
    },
    title:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    },

    timelimit:{
        type:Number,
        required:false
    },

    attemp:{
        type:Number,
        required:false
    },

    duedate:{
        type:String,
        required:false
    },

    datebelong:{
        type:String,
        required:false,
    },

    questions:{
        type:[Object], 
        // {
        //     type:'some type', data:{questions:String, message:String, etc}
        // }
        required:false
    },
    finishStudent:{
        type:[Object],
        required:false
    },
    // {
    //     student:Object, correctAns:Number, attemp:Number, time:String, date: Date now
    // }
    created:{
        type:String,
        default:today,
        required:false
    },

    end:{
        type:String,
        required:false
    }
})