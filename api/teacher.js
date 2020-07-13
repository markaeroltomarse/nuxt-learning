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


//KUNIN LAHAT NG QUIZ
router.get('/home', async (req, res) => {
    try{
        let quizes = await Quiz.find()
        let ownquizes = quizes.filter(q=> q.postedby == req.session.userId)
        return res.json({
            quizes,
            ownquizes
        })
    }catch(err){
        return res.status(400).json({err})
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
//UUPDATE UNG ISANG QUESTION NA QUIZ
router.post('/subject/quiz/updatequestion', async (req, res) => {
    let q = req.body
    try{
        return await Quiz.findOneAndUpdate({'_id':q.quizID, 'questions._id': q.question._id}, {'$set': {
            
            'questions.$':q.question
        }}, {new:true}, 
        (err, result ) => {
            if(err) return res.json({msg:err})
            return res.json(result.questions)
        })
        
    }catch(err){
        return res.status(404).json({msg:err})
    }
})

//DELETE ANG QUIZ
router.delete('/subject/quiz/deletequiz', async (req, res) => {
    console.log(req.body)
    //if(!req.body.Authorization) return res.status(400).json({msg:'You are not authorized in this request!'})
    try{
        return Quiz.remove({_id: req.body.quizID}, (err, removed) => {
            if(err) return res.status(400).json({msg:'Something wrong in deleting quiz'}) 

            res.json({msg:'Deleted Successfully'})
        })
    }catch(err){
        return res.status(400).json({msg:err})
    }
})


//UUPDATE NATIN ANG INFO NG QUIZ 
router.patch('/subject/quiz/updateinfo', async (req, res) => {
    try{
        return await Quiz.findOneAndUpdate({_id:req.body.quizID}, {
            $set :{
                attemp:req.body.attemp,
                timelimit:req.body.timelimit,
                title:req.body.title,
                description:req.body.description,
                duedate:req.body.duedate
            }},{new:true},

            (err, updated) => {
                if(err) return res.status(400).json({msg:err})
                res.json({msg:`Quiz ${updated.title} update successfully`, updatedquiz:updated})
            })
    }catch(err){
        res.status(200).json({msg:err})
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
router.get('/master/courses', async (req, res) => {
    try{
        let coursesArr = []
        let courses = await Course.find()
        
        
        for (const c of courses) {
            //console.log(('5ebace54af2449408087984e' == c._id))
            
            let courseSubs = await Subjects.find({course:c._id})
            let totalteacher = 0
            let totalenrolled = 0
            
            for(const s of courseSubs){
                // let q = await Quiz.find({'subject._id':s._id})
                // totalquiz += q.length
                totalteacher += s.assignTeachers.length 
                totalenrolled += s.enrolled.length
            }

            let totalquiz = await Quiz.find()
            totalquiz = totalquiz.filter(q => q.subject.course == c._id)

            coursesArr.push({
                course:c,
                totalsub:courseSubs.length,
                totalteacher,
                totalenrolled,
                totalquiz:totalquiz.length
            })
        }
        
        
        
        return res.status(200).json(coursesArr)
    }catch(err){
        console.log(err)
        return res.json({msg:err})
    }
})

//GETTING SUBJECTS FROM MASTER
router.post('/master/courses/course', async (req, res) => {
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
            if(sub.sem == 'first' & sub.studentyear ==  req.body.studentyear) return course[0].first.push(sub)
            if(sub.sem == 'second' & sub.studentyear ==  req.body.studentyear) return course[0].second.push(sub)
            if(sub.sem == 'third' & sub.studentyear ==  req.body.studentyear) return course[0].third.push(sub)
            if(sub.sem == 'fourth' & sub.studentyear ==  req.body.studentyear) return course[0].fourth.push(sub)
        })
        let teachers = await getDepartmentTEacher(req.body.courseID)
        return res.json({msg:'', data:course[0], teachers})
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
        const teachers = await getTeacherThroughIDS(subjects[0].assignTeachers)
        res.json({subject:subjects[0], result:true, quizes, teachers})
    }catch(err){
        return res.sendStatus(404)
    }
    
})

//BAGONG SUBJECT NA IINSERT 
router.post('/course/subject/newsubject', async (req, res) => {
    const {course, sem, code, name, units, year, desc, studentyear, subimg} = req.body
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

// router.post('/master/course/deptteacher', async (req, res) => {
//     try{
        
        
//         const DeptTeachers = await Users.find({'teacherInfo.department': req.body.courseID })
//         return res.status(200).json({msg:'', data:DeptTeachers})
//     }catch(Err){
//         return res.status(404).json({msg:Err})
//     }
// })


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

async function getTeacherThroughIDS(IDs){
    try{
        return await Users.find({
            '_id': { $in: [
                ...IDs
            ]}
        }, (err, docs) => {
             if(err) return {msg:err}
             return docs
        })
        
    }catch(err){
        return {
            msg:err
        }
    }
}

async function getDepartmentTEacher(courseID){
    const DeptTeachers = await Users.find({'teacherInfo.department': courseID })
    
    return DeptTeachers
    
}




module.exports = router