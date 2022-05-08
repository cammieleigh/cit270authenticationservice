const bodyParser = require('body-parser');
const express = require('express'); //import the library
const app = express(); //use the library

app.use(bodyParser.json()); 

app.listen(3000, ()=>{console.log("listening...")});

app.post('/login', (request, response)=>{
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

