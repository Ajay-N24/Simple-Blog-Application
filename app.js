const express=require("express");
const bodyParser=require("body-parser");
const app=express();
let _ = require('lodash');
const mongoose=require("mongoose");
let key=process.env.KEY;
mongoose.connect("mongodb+srv://Ajayprmk:"+key+"@cluster0.pap6tc8.mongodb.net/blogDB");
const postSchema={
    title: String,
    content: String
};
const POSTS = mongoose.model("post",postSchema);
const home="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
const about="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
const contact="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');
app.get("/",function(req,res){
    POSTS.find({})
    .then((past)=>{
        res.render("home",{
            home: home,posts: past
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.get("/posts/:at",function(req,res){
    let id=req.params.at;
    POSTS.findOne({_id: id})
    .then(
        (past)=>{
            let postTitle=past.title;
            let postBody=past.content;
            res.render("post",{tit: postTitle,bod: postBody});
        }
    )
    .catch((err)=>{
        console.log(err)
    })
})
app.get("/home",function(req,res){
    res.render("home",{home: home});
})
app.get("/about",function(req,res){
    res.render("about",{about:about});
})
app.get("/contact-us",function(req,res){
    res.render("contact-us",{contact:contact});
})
app.get("/compose",function(req,res){
    res.render("compose");
})
app.post("/compose",function(req,res){
    let ar1=_.kebabCase(req.body.title1);
    console.log(req.body)
    const posted=new POSTS({
        title: req.body.title1,
        content: req.body.content1
    });
    posted.save()
    .then(()=>{
        console.log("inserted");
        res.redirect("/");
    })
    .catch((err)=>{
       console.log(err) 
    })
})
app.listen(process.env.PORT||3000,function(){
    console.log("Website running on port 3000");
})