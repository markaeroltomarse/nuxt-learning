const express = require('express')
const cors = require('cors')
const session = require('express-session')
const mongoose = require('mongoose')



const app = express()


//INITIALIZING SERVER AND SOCKET

var server = require('http').createServer(app);  
var io = require('socket.io')(server);


//Env Config
require('dotenv/config')

//mongoose connection
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser:true, useUnifiedTopology:true },
    () => {
        console.log('Database Connected!')
    }
)

//Session config
const SESSION_LIFETIME = 1000 * (500 * 400 * 300)
app.use(session({
    name:'user_token', //pangalan ng session
    resave:false, //kada mag loload ay irereset ibabato nya ang session value sa response then also nirereset din nya ung maxAge value
    saveUninitialized:false,
    secret:'13423k4jflsdjfsdlfj//', //parang mismong ID ng session natin \
    cookie:{
        maxAge:SESSION_LIFETIME,
        sameSite:true,
        secure:false
    }
}))

//Middlewares CCORS
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST', 'DELETE', 'PATCH', 'PUT', 'CREATE'],
    credentials: true // enable set cookie
}))



//Request message
app.use((req, res, next) => {
    console.log('Request happen!')
    next()
})

app.use(express.urlencoded({extended:false}))
app.use(express.json())


//auth API's
const auths = require('./api/auth')
app.use('/api/auth', auths)

//Teacher's API's
const teacher = require('./api/teacher')
app.use('/api/teacher', teacher)




const port = process.env.PORT || 5000

// Handle connection
io.on('connection', (socket) => {
    
    console.log('Client connected...');
    //socket.emit('newMessage', 'Hello from server');

    socket.on('client_greetings', data => {
        socket.emit('server_greetings', data)
    })
    socket.on('notify_server', data => {
        socket.emit('greetings', data)
    })
   
});

//AND START THE SERVER
server.listen(port, () => console.log('Server listening on port '+port))





