const express = require('express')
const models = require('../models/')
const multer = require('multer')
const path = require('path')

const router = express.Router()

const Subjects = models.Subjects
const Quiz = models.Quiz
const Course  = models.Course





//Multer middleware config
function fileUpload(destination){
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, destination)
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
        }
    })

    return multer({ storage: storage });
}










router.get('/subjects', async (req, res) => {
    try{
        let subs = await Subjects.find({assignTeachers:req.session.userId})
        return res.status(200).json(subs)
    }catch(err){
        return res.status(404).json({msg:err})
    }
})

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


router.get('/course', async (req, res) => {
    try{
        let courses = await Course.find()
        return res.status(200).json(courses)
    }catch(err){
        return res.json({msg:'Submitting course error!'})
    }
})


router.post('/course/subject/newsubject', fileUpload(path.join(__dirname, '../client/assets/uploads/courseimg/')).single('newsubimg'), async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    return res.json({msg:'Subjects successfully added in ' + req.body.course})
    try{
        let newsubject = new Subjects({
            
        })
    }catch(err){
        return res.status(404).json({msg:err})
    }
})


//SINGE FILE UPLOAD 
router.post('/singleupaload', fileUpload(path.join(__dirname, '../client/assets/uploads/courseimg/')).single('courseimg'), async (req, res) => {
    console.log(req.file)
    return res.json({msg:'File uploaded', result:req.file.filename})
})

module.exports = router