const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const express = require('express'); //import the library
const app = express(); //use the library
const md5 = require('md5');
const {createClient} = require('redis');



app.use(bodyParser.json()); 

redisClient = createClient(
    {url: 'redis://defualt@10.128.0.3:6379',});


https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
    passphrase: 'P@ssw0rd'
}, app).listen(443, async () => {
    await redisClient.connect();
    console.log('Listening...')
})


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

const savePassword = async (request, response) =>{
    const clearTextPassword = request.body.password;
    const hashedTextPassword = md5(clearTextPassword);
    await redisClient.hSet('passwords', request.body.userName, hashedTextPassword);
    response.status(200);
    response.send({result:"Saved"});
}
app.post('/signup', signup);
app.post('/signup', savePassword);

