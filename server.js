const bodyParser = require('body-parser');
const express = require('express'); //import the library
const app = express(); //use the library
const md5 = require('md5');
const redis = require('redis');

const redisClient = redis.createClient();

app.use(bodyParser.json()); 

app.listen(3000, ()=>{console.log("listening...")});

//compare the hashed version of the password that was sent with the hashed version in the database


app.post('/login', async (request, response)=>{ //a post is when a client sends new information to an API
    const hashedPassword = md5(request.body.password);
    const password = await redis.Client.hGet('passwords' , request.body.userName);
    const loginRequest = request.body;
    console.log("Request Body", request.body);
    if (loginRequest.userName == "2school4cool@gmail.com" && loginRequest.password == "Tr00p$r"){
        response.status(200);
        response.send("Welcome");
    }
    else{
        response.status(401);
        response.send("Unauthorized");
    }
});

app.get('/',(req,res)=>{res.send("Hello")});

