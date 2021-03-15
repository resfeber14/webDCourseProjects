const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static("public"));
let items=["Wake up","Make Tea","Have tea"];
let workitems=[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended:true }));
app.get('/', function(req, res){
    //res.send("<h1>Hello</h1>");
    let today=new Date();
    let options={
         weekday:"long",
         day:"numeric",
         month:"long"
    };
    let day=today.toLocaleDateString("en-US",options);
    //var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //res.render("list", {kindof:days[currday]});
    res.render("list",{
        Title:day,
        newlists:items
    });
});
app.post('/',function(req, res){
    let item=req.body.newitem;
    if(req.body.list==="Work"){
        workitems.push(item);
        res.redirect('/work');
    }
    else{
        items.push(item);
        res.redirect('/');
    }
    
    
})
app.get("/work",function(req, res){
    res.render("list",{
        Title:"Work list",
        newlists:workitems
    });
})

app.listen(3000,function(){
    console.log("Server started");
})
