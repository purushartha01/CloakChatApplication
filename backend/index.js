const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');



const mongo = require('./config/dbInit.js');
const { port, mongo_srv } = require('./config/config.js');
const logger = require('./middlewares/logger.js');
const authRoutes = require('./routes/authRoutes.js');
const chatRoutes=require('./routes/chatRoutes.js');
const { notFound, errorHandler } = require('./middlewares/errorHandler.js');



const app = express();
const server = createServer(app);


app.use(logger);
// app.use(cors());
// 
//for allow cross origin request
app.use(cors(
    {
        origin: true,
        credentials: true,
    }
))

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', authRoutes);
app.use('/api/v1/chat',chatRoutes);


app.get('/', (req, res) => {
    try {
    } catch (e) { }
    res.end("HI");
});



const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        // origin: ['http://localhost:5173/',"*"],
        origin:'*'
    }
})


io.on('connection', (socket) => {
    console.log("Socket connected " + socket.id)
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id + " connected")
        socket.emit("connected");
    });

    socket.on('join-chat',(room)=>{
        console.log(socket.id+" joined "+room);
        socket.join(room);
    })

    socket.on('typing',(room)=>{
        socket.in(room).emit('typing');
    })

    socket.on('stop-typing',(room)=>{
        socket.in(room).emit('stop-typing')
    })

    socket.on('new-msg',(msg)=>{
        const chat=msg.chatname;

        const chatMembers=msg.chatMembers;
        if(chatMembers.length===0){
            console.log("Users not defined");
        }

        chatMembers.forEach((mem)=>{
            if(mem.id===msg.sender.id){
                return;
            }

            // console.log("Received message from")
            //TODO: Make sure the socket ID is same as user.id
            socket.in(user.id).emit('msg-received',msg);
        })
    })

    socket.off('setup',()=>{
        console.log(`Socket disconnected: ${socket.id}`)
        socket.leave(userData.id)
    })
})

app.use(notFound)
app.use(errorHandler)


mongo()
    .then(() => {
        console.log(`Connected to database!`)
        server.listen(port, () => {
            console.log(`Server running at port ${port}`);
        })
    })
    .catch((err) => {
        console.log(err);
    });