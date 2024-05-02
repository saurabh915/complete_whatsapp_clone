import {Server} from "socket.io";
const io = new Server(9000,{
    cors:{
        origin:"http://localhost:3000"
    }
})
let users =[];
const addUser = (userData,socketId)=>{
!users.some(user => user.sub === userData.sub ) && users.push({...userData , socketId}) 


}
const getUser = (userId)=>{
    return users.find(user=>user.sub == userId );
}


io.on("connection",(socket)=>{
console.log("user connected");
socket.on("addUsers",userData =>{
    
    addUser(userData,socket.id);
    console.log("users are");
    console.log(users);
    io.emit("getUsers",users);
})

socket.on("sendMessage" ,data =>{
    const user = getUser(data.receiverId);
    console.log("message sent from sender "+ user.socketId);
    io.to(user.socketId).emit('getMessage',data);
})
})