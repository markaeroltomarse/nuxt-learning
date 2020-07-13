const mongoose = require('mongoose')
const moment = require('moment')


let today = moment().format('MMMM Do YYYY, h:mm:ss a');
let yesterday =  moment().subtract(1, "days").format('MMMM Do YYYY, h:mm:ss a') - 1;

module.exports = mongoose.Schema({
    fname:{
        type:String,
        required:true,
        length:25
    },
    lname:{
        type:String,
        required:true,
        length:25
    },

    email:{
        type:String,
        required:true,
        length:25
    },

    password:{
        type:String,
        required:true,
        length:25
    },
    userType:{
        type:String,
        requireq:true,
        length:10
    },

    gender:{
        type:String,
        required:true,
        length:10
    },
    age:{
        type:Number,
        required:true
    },
    created:{
        type:String,
        default:today
    },
    studentInfo:{
        studentID:{
            type:String,
            default:moment().format('YYYY')
        },
        section:{
            type:String,
            required:false,
            length:25
        },
    
        year:{
            type:String,
            required:false,
            length:25,
        },
        
        subjects:{
            type:[String],
            require:false,
            default:[]
        },
        quizesTaken:{
            type:[String],
            default:[]
        },
        status:{
            mode:{
                type:String,
                default:'active'
            },
            modified:{
                type:String,
                required:false,
                default:today,
            }
        },
    },

    images:{
        
        photos:{
            type:[String],
            required:false
        },
        profile:{
            type:String,
            required:false,
            default:''
        },
    },

    teacherInfo:{
        major:String,
        department:String,
        status:{
            mode:{
                type:String,
                default:'active',
                required:false
            },
            modified:{
                type:String,
                default:today,
                required:false,
            }
        }
    }

    
})

