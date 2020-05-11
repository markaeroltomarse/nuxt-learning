const express = require('express')
const Users = require('../models/index').Users


const router = express.Router()


router.get('/', async (req, res) => {
    try{
        const users = await Users.find()
        return res.json(users)
    }catch(err){
        return res.status(404).json({msg:'Error: '+err})
    }
})


router.get('/user', async (req, res ) => {

    try{
        const user = await Users.find({_id:req.session.userId})
        if(user.length > 0) return  res.status(200).json(user[0])
        return res.status(200).json({msg:'User not find'})
    }catch(err){
        return res.status(404).json({msg:err})
    }
})

router.post('/login', async (req, res) => {
    let {email, password } = req.body
    //return res.status(200).json({msg:'Invalid login!', result:false})
    try{
        const login = await Users.find({email, password})
        if(login.length > 0 ){
            req.session.userId = login[0]._id
            res.status(200).json({msg:'Login success!', result:true, user:login[0]})
            return req.session.userId = login[0]._id
        }

        return res.status(200).json({msg:'Invalid login!', result:false})
    }catch(err){
        return res.status(404).json({msg:'Login error: '+err})
    }
})

router.get('/logout', async (req, res) => {
    req.session.userId = ''
    return res.status(200).json({msg:'Success Logout!', token:req.session.userId})
})


router.get('/exist', async (req, res )=>{
    if(req.session.userId == '' | req.session.userId == null) return res.status(200).json({result:false, token:''})
    try{
        let check = await Users.find({_id:req.session.userId})
        if(check.length > 0) return res.status(200).json({result:true, token:req.session.userId, user:check[0]})
    }catch(err){
        return res.status(404).json({result:false})
    }
     
})


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