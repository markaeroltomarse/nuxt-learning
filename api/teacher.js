const express = require('express')
const models = require('../models/')
const multer = require('multer')
const path = require('path')
const uuid = require('uuid')
var fs = require('fs');
const ERR = require('../errors/teachersErr')
const moment = require('moment')

const router = express.Router()

const Subjects = models.Subjects
const Quiz = models.Quiz
const Course  = models.Course
const Users = models.Users

//DATE OPTIONS
// let date = new Date();
// let yesDd = String(date.getDate() - 1).padStart(2, '0');
// let dd = String(date.getDate()).padStart(2, '0');
// let mm = date.getMonth(); //January is 0!
// let yyyy = date.getFullYear();


// const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

let today = moment().format('MMMM Do YYYY, h:mm:ss a');
let yesterday =  moment().subtract(1, "days").format('MMMM Do YYYY, h:mm:ss a');


function upload(){
    
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {          
          cb(null, path.join(__dirname, `../client/assets/uploads/${req.query.dest}/`))
        },
        filename: function (req, file, cb) {
          cb(null, uuid.v4() + path.extname(file.originalname)) //Appending extension
        }
    })
    
    //Multer middleware config
    return multer({ storage: storage})
}







//KUKUNIN ANG MGA SUBJECT NA NAKA TOKA SA TEACHER 
router.get('/subjects', async (req, res) => {
    try{
        let subs = await Subjects.find({assignTeachers:req.session.userId})
        return res.status(200).json(subs)
    }catch(err){
        return res.status(404).json({msg:err})
    }
})




//BAGONG QUIZ NA IINSERT SA SUBJECT
router.post('/subject/newquiz', async (req, res) => {
    console.log(req.body.newquiz)
    //return res.json({msg:'New quiz has posted!'})
    //return res.json({msg:'New quiz has posted!'})
    try{
        // a document instance
        let newquiz = new Quiz(req.body.newquiz);
    
        // save model to database
        newquiz.save( (err, quiz) => {
            if (err) return console.error(err);
            return res.json({msg:'New quiz has posted!'})
        });
    }catch(err){
        return res.status(404).json({msg:err})
    }
})

//BAGONG COURSE NA IINSERT
router.post('/course/new', async (req, res) => {
    let { name, code, courseimg} = req.body
    //return res.status(200).json({msg:'Course added and Image course uploaded!', data:req.body})
    try{
        let existcode = await Course.find({code})
        if(existcode.length > 0) return res.json({msg:'Course ID is already exist'})
        let newcourse = new Course({
            name, code, courseimg
        })
        newcourse.save((err, course) => {
             if(err) return console.error(err);
             return res.status(200).json({msg:'Course added!', data:course})
        })
    }catch(err){
        return res.json({msg:'Submitting course error!'})
    }
})

//MGA COURSE 
router.get('/course', async (req, res) => {
    try{
        let courses = await Course.find()
        return res.status(200).json(courses)
    }catch(err){
        return res.json({msg:'Submitting course error!'})
    }
})

//GETTING SUBJECTS FROM MASTER
router.post('/master/course', async (req, res) => {
    try{
        let course = await Course.find({_id: req.body.courseID})
        if(course.length < 0){
            return res.json({msg:'Undefined subjects', error:ERR.UNDEFINED_SUBJECT})
        }
        let courseSubs = await Subjects.find({course:req.body.courseID})
        course[0].subjects = courseSubs
        //console.log(courseSubs.length)
        courseSubs.forEach(sub => {
            //console.log(sub)
            if(sub.sem == 'first') return course[0].first.push(sub)
            if(sub.sem == 'second') return course[0].second.push(sub)
            if(sub.sem == 'third') return course[0].third.push(sub)
            if(sub.sem == 'fourth') return course[0].fourth.push(sub)
        })
        return res.json({msg:'', data:course[0]})
    }catch(err){
        return res.status(200).json({msg:err})
    }
})

//KUNIN ANG ISANG SUBJECTS PARA SA MASTER
router.post('/master/course/subject', async (req, res) => {
    try{
        let subjects = await Subjects.find({_id:req.body.subID})
        if(subjects.length < 0){
           
            return res.status(404).json({msg:ERR.UNDEFINED_SUBJECT, result:false,})
        }
        const quizes = await getSubjectQuizes(req.body.subID)
        
        res.json({subject:subjects[0], result:true, quizes})
    }catch(err){
        return res.sendStatus(404)
    }
})

//BAGONG SUBJECT NA IINSERT 
router.post('/course/subject/newsubject', async (req, res) => {
    const {course, sem, code, name, units, year, desc, subimg} = req.body
    //console.log(req.body)
    try{
       let newsubjects = new Subjects(req.body)

       newsubjects.save((err, subject) => {
           if(err) return res.status(500).json({msg:err})
           
           return res.status(200).json({msg:`New subject has uploaded to ${sem} course.`})
       })
    }catch(err){
        return res.status(500).json({msg:err})
    }
    return 
    
})

//IUPDATE ANG CONFIG NG SUBJECT
router.post('/master/course/subject/updateconfig', async (req, res) => {
    console.log(req.body)
    try{
        return await Subjects.updateOne({_id: req.body.subid}, {
            config: req.body.config
        }, (err, resp) => {
            if(err) throw err
            return res.status(200).json({msg:'Subject config saved!', result:true}) 
        })
    }catch(err){
        return res.status(404).json({msg:err, result:false})
    }
})

//MAG AADD TAYO NG BAGONG TEACHER SA DEPARTMENT OR COURSE
router.post('/master/course/newteacher', async (req, res) => {
    console.log(req.body)
    const {fname, lname, username, password, gender, age, major, course} = req.body
    
    try{
        const validate = await Users.find()
        if(validate.some(user => user.email == username | user.password == password))  return res.json({msg:'User name or password is not available', result:false}) 

        const newTeacher = new Users({
            fname, lname, email:username, password, gender, age, userType:'admin',
            teacherInfo:{major, department:course}
        }) 
        //return res.json({msg:'Teacher added!', result:newTeacher})
        
        newTeacher.save().then(resteacher => {
            res.status(200).json({msg:'Teacher added!', result:resteacher})

            fs.mkdirSync(path.join(__dirname, '../client/assets/uploads/users/'+resteacher._id));
        })
        .catch(err => res.status(200).json({msg:err, result:false}))
    }catch(err){
        return res.json({msg:'Something wrong.. :'+err, result:false})
    }
})

router.post('/master/course/deptteacher', async (req, res) => {
    try{
        
        
        const DeptTeachers = await Users.find({'teacherInfo.department': req.body.courseID })
        return res.status(200).json({msg:'', data:DeptTeachers})
    }catch(Err){
        return res.status(404).json({msg:Err})
    }
})


//ASSIGN NEW TEACHER INTO SUBJECT
router.post('/master/course/subject/newteacherassign',   async (req, res)=> {
    // console.log(req.body)
    // console.log(req.body.subID)
    //return res.json({msg:`Teacher's assigned!`})
    try{
        let teachers = req.body.teachers
        teachers.forEach(async teacher => {
            return await Subjects.updateOne({_id:req.body.subID}, {$push:{assignTeachers:teacher._id }})
        })
        return res.json({msg:`Teacher's assigned!`})
    }catch(err){
        return res.status(404).json({msg:err})
    }
})

//REMVOE NEW TEACHER INTO SUBJECT
router.delete('/master/course/subject/deleteteacher', async (req, res) => {
    console.log(req.body)
    //return res.json({msg:'Success!', })
    try{
        let removeAssign = await Subjects.updateOne({_id: req.body.subID}, { $pullAll: {assignTeachers: [req.body._id] } })
        return res.json({msg:'Success!', data:removeAssign})
    }catch(err){
        return res.status(404).json({msg:err})
    }
})

// //KUKUNIN NATEN MGA QUIZES NG ISANG SUBJECT
// router.post('/master/course/subject/subjectquizes', async (req, res) => {
//     try{
//         const quizes = await Quiz.find({'subject._id':req.body.subID})
//         return res.json(quizes)
//     }catch(err){
//         return res.status(404).json({msg:err})
//     }
// })


//SINGE FILE UPLOAD ROUTES
router.post('/singleupload',  async (req, res) => {

    upload().single(req.query.fileref)(req, res, (error) => {
        if (error) {
          
            return res.status(500).json({msg:`File upload error: ${error}`});
        }
        // console.log(req.file)
        // console.log(req.query.fileref)
        // console.log(req.query.dest)
        // console.log('FILENAME WITH UUID : '+ req.file.filename)
        res.status(200).json({msg:'File uploaded', imagetoken:req.file.filename})
    // code
    })

    return
    
})

//FILE MULTIPLE UPLOADS ROUTES
router.post('/multiupaload',  async (req, res) => {

    upload().array(req.query.fileref)(req, res, (error) => {
        if (error) {
          
          return res.status(500).json({msg:`File upload error: ${error}`});
        }
        console.log(req.file)
        console.log(req.query.fileref)
        console.log(req.query.dest)
        
        res.json({msg:'Files uploaded'})
    // code
    })

    return
    
})

//METHDOS

let getSubjectQuizes = async (subID) => {
    let quizes = await Quiz.find({'subject._id':subID})

    return quizes
}




module.exports = router