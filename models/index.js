const mongoose = require('mongoose')
const moment = require('moment')


let today = moment().format('MMMM Do YYYY, h:mm:ss a');
let yesterday =  moment().subtract(1, "days").format('MMMM Do YYYY, h:mm:ss a') - 1;



const users = require('./schemes/users')



const course = require('./schemes/course')

const subjects = require('./schemes/subjects')
const quiz = require('./schemes/quiz')

module.exports = {
    Course:mongoose.model('course', course),
    Users:mongoose.model('users', users),
    Subjects:mongoose.model('subjects', subjects),
    Quiz:mongoose.model('quiz', quiz)
}