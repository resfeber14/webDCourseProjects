const express = require('express');
const bodyParser = require('body-parser');
const request= require('request');
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req, res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req, res){
    var first=req.body.fname;
    var last=req.body.lname;
    var email=req.body.email;
    var data={
        members:[
            {
                email_address:email,
                
                merge_fields:{
                    FNAME:first,
                    LNAME:last,
                },
                
                status:"subscribed"
            }
        ]
    };
    var jsondata=JSON.stringify(data); 
    console.log(first,last,email);
    var option={
        url: 'https://us1.api.mailchimp.com/3.0/lists/91508ebedc',
        method: 'POST',
        headers: {
            "Authorization":"resfeber14 b3644c9f9b135f855826e364f6467ed0-us1"
        },
        body:jsondata

    };
    request(option, function(error, response, body){
        if(error){
            res.sendFile(__dirname+"/failure.html");
        }
        else{
            if(response.statusCode===200){
                res.sendFile(__dirname+"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }
        }
    });
});
app.post('/failure',function(req,res){
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("Server listening on 3000");
});

//b3644c9f9b135f855826e364f6467ed0-us1
//91508ebedc