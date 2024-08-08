
const express = require('express');
const app = express();
const path = require('path');
const userModel = require("./models/user")
// Set the view engine to EJS
app.set("view engine", "ejs");

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the root route
app.get("/", (req, res) => {

    res.render("index")

});

app.post("/create",async(req, res)=>{
  let createdUser = await  userModel.create({
        name :req.body.name,
        email : req.body.email,
        image : req.body.image
    })
   
    res.redirect("/read")
})

app.get("/read",async(req,res)=>{
    let allusers = await userModel.find();
    res.render("read",{users:allusers});
    // res.render("read")
})

app.get("/edit/:id",async(req, res)=>{
    let user = await userModel.findOne({_id:req.params.id})
    res.render("edit",{user})
})

app.post("/update/:id",async(req,res)=>{
    let {name,email,image} = req.body;
     let updatedUser = await userModel.findOneAndUpdate({_id:req.params.id},{name,email,image},{new:true})
    res.redirect("/read")
})
app.get("/delete/:id",async(req, res)=>{
    let deleteUser = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read")
    
})

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
