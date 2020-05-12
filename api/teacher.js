const express = require('express')
const models = require('../models/')
const multer = require('multer')
const path = require('path')
const uuid = require('uuid')

const ERR = require('../errors/teachersErr')


const router = express.Router()

const Subjects = models.Subjects
const Quiz = models.Quiz
const Course  = models.Course




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
        console.log(courseSubs.length)
        courseSubs.forEach(sub => {
            console.log(sub)
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

//BAGONG SUBJECT NA IINSERT 
router.post('/course/subject/newsubject', async (req, res) => {
    const {course, sem, code, name, units, year, desc, subimg} = req.body
    console.log(req.body)
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


//SINGE FILE UPLOAD ROUTES
router.post('/singleupload', async (req, res) => {

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
router.post('/multiupaload', async (req, res) => {

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



module.exports = router