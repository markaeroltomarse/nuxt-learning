const express = require('express')
const Users = require('../models/index').Users


const router = express.Router()

//KUNIN ANG MGA USERS
router.get('/', async (req, res) => {
    try{
        const users = await Users.find()
        return res.json(users)
    }catch(err){
        return res.status(404).json({msg:'Error: '+err})
    }
})

//KUNIN ANG MULTIPLE SPECIFIC USERS
router.post('/multipleuser', async (req, res) =>{
    try{
        let users = await Users.find({_id:req.body.users})
        return res.json({data:users})
    }catch(err){
        return res.status(400).json({msg:err})
    }
})


//KUNIN ANG ISANG USER 
router.post('/user', async (req, res) =>{
    try{
        let user = await Users.findOne({_id:req.body.user})
        return res.json({data:user})
    }catch(err){
        return res.status(400).json({msg:err})
    }
})

//KUNIN ANG USER NA NAKA SESSION
router.get('/user', async (req, res ) => {

    try{
        const user = await Users.find({_id:req.session.userId})
        if(user.length > 0) return  res.status(200).json(user[0])
        return res.status(200).json({msg:'User not find'})
    }catch(err){
        return res.status(404).json({msg:err})
    }
})

//LOGIN PROCESS
router.post('/login', async (req, res) => {
    //return res.status(200).json({msg:'Invalid login!', result:false})
    console.log(req.body)
    let {email, password } = req.body

    return await Users.findOne({email, password}, 'email password', (err, user) => {
        if (err) return res.status(404).json({msg:'Login error: '+err})
        // Prints "Space Ghost is a talk show host".
        if(user != null ){
            req.session.userId =user._id
            res.status(200).json({msg:'Login success!', result:true, user:user})
            return req.session.userId = user._id
        }
        

        return res.status(200).json({msg:'Invalid login!', result:false})
    });
       
})

//LOGOUT PROCESS
router.get('/logout', async (req, res) => {
    req.session.userId = ''
    if(req.session.userId == ''){
        req.session.userId = ''
        return res.status(200).json({msg:'Success Logout!', token:req.session.userId})
    }

    res.sendStatus(404)
})

//KUNG MAY NAKA LOGIN NABA
router.get('/exist', async (req, res )=>{
    if(req.session.userId == '' | req.session.userId == null) return res.status(200).json({result:false, token:''})
    try{
        let check = await Users.find({_id:req.session.userId})
        if(check.length > 0) return res.status(200).json({result:true, token:req.session.userId, user:check[0]})
    }catch(err){
        return res.status(404).json({result:false})
    }
     
})

//KUNG ANONG TYPE NG USER NA NAKALOGIN
router.get('/type', async (req, res) => {
    try{
        if(req.session.userId == '' | req.session.userId == null) return res.json({result:'', msg:'NULL SESSION'})
        
        let type = await Users.find({_id:req.session.userId })
        
        return res.json({result:type[0].userType , msg:'NULL SESSION ' +type[0].userType})
    }catch(err){
        res.json({msg:err})
    }
})




module.exports = router