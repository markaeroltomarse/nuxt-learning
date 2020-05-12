const mongoose = require('mongoose')
let date = new Date()


const users = mongoose.Schema({
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

    section:{
        type:String,
        required:false,
        length:25
    },

    year:{
        type:String,
        required:true,
        length:25,
    },
    
    subjects:{
        type:[String],
        require:false
    },

    quizesTaken:{
        type:[String]
    }
})



const course = mongoose.Schema({
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
        default:`${date.getFullYear() }/${date.getMonth()}/${date.getDate()}`
    }
})



const subjects = mongoose.Schema({
    course:String,
    name:String,
    code:String,
    units:Number,
    desc:String,
    year:String,
    sem:String,
    subimg:String,
    enrolled:{
        type:[String],
        default:[],
        required:false
    },
    assignTeachers:{
        type:[String],
        default:[],
        required:false
    }
})


const quiz = mongoose.Schema({
    
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
        default:`${date.getFullYear() }/${date.getMonth()}/${date.getDate()}`,
        required:false
    },

    end:{
        type:String,
        required:false
    }
})

module.exports = {
    Course:mongoose.model('course', course),
    Users:mongoose.model('users', users),
    Subjects:mongoose.model('subjects', subjects),
    Quiz:mongoose.model('quiz', quiz)
}