const express=require("express");
const app=express();
const users=require("./routes/users.js");
const posts=require("./routes/posts.js");
const session=require("express-session");
const flash=require("connect-flash");

const path=require("path");





const cookieParser=require("cookie-parser");



app.use("/users",users);
app.use("/posts",posts);
app.use(cookieParser("secretcode"));
app.use(flash());

app.use((req,res,next)=>{

    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();


})



const sessionOptions={
    
        secret:"mysupersecretstring",
        resave:false,
        saveUninitialized:true,

       
};


app.use(session(sessionOptions));

app.get("/register",(req,res)=>{

    let {name="anonymous"}=req.query;

    req.session.name=name;
    console.log(req.session.name);

    if(name==="anonymous"){

        req.flash("error","user not registered");
    
    
    }else{
    
        req.flash("success","user registered succesfully");
        
    
    }
    

  
    res.redirect("/hello");



   
});



app.get("/hello",(req,res)=>{

   

    res.render("page.ejs",{name:req.session.name});

});









/*
app.get("/reqcount", (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`You sent a request ${req.session.count} times`);
});


app.get("/test",(req,res)=>{
    res.send("test successful");
});




app.get("/getcookies",(req,res)=>{

    res.cookie("greet","hello",{signed:true});
    res.send("sent you a cookie");
});
app.get("/verify",(req,res)=>{
    console.log(req.Cookies);
    res.send("verified");

})
app.get("/",(req,res)=>{
    console.dir(req.cookies);

    res.send("Hi i am root");
});*/
app.listen(3000,()=>{

    console.log("Server is listening to 300");


});

