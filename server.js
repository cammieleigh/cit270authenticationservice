const bodyParser = require('body-parser');
const express = require('express'); //import the library
const app = express(); //use the library
const md5 = require('md5');
const {createClient} = require('redis');

const redisClient = createClient({socket: {port:6379, host: '127.0.0.1'}});

app.use(bodyParser.json()); 

app.listen(3000, async ()=>{console.log("listening...")
    await redisClient.connect()});



//compare the hashed version of the password that was sent with the hashed version in the database



app.post('/login', async (request, response)=>{ //a post is when a client sends new information to an API
    
    const loginRequest = request.body;
    const requestHashedPassword = md5(request.body.password);
    const redisHashedPassword = await redisClient.hGet('passwords' , request.body.userName);
    console.log("Request Body", request.body);
    if  ( requestHashedPassword == redisHashedPassword){
        response.status(200);
        response.send("Welcome");
    }
    else{
        response.status(401);
        response.send("Unauthorized");
    }
});


app.get('/',(req,res)=>{res.send("Hello")});

const signup = async (request,response) =>{
    

}
app.post('/signup', signup);

