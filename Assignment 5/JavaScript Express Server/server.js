const express=require('express');
const server=express();
const port=3000;
server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

server.get('/js/main.js',(req,res)=>{
    res.sendFile(__dirname+"/js/main.js");
});

server.get('/css/style.css',(req,res)=>{
    res.sendFile(__dirname+"/css/style.css");
});

server.post('/welcome',(req,res)=>{
    console.log(req.body);
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
//server side validation 
    if(firstName.length<2 || lastName.length<2){
        res.send("First Name | Last name not provided ");
    }else{
        res.send(`Welcome ${firstName} ${lastName}`);
    }

});


server.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});