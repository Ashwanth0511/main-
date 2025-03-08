const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const Usermodel = require('./models/users')
const complainmodule  = require("./models/complains")
const bikemodule = require("./models/bikes")

const commentmodel = require("./models/comments")
const carmodule = require("./models/cars")


const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect("mongodb://127.0.0.1:27017/Mernstackpro")

app.post("/login",(req,res) =>{
  const{email,password}= req.body;
  Usermodel.findOne({email:email})
  .then(users=>{
    if(users){
    if(users.password==password){
      res.json({status:"Success",uname:users.uname,_id:users._id});
    }
    else res.json("Incorrect password");
  }
  else res.json("no record exited");
})
.catch(err => console.log(err))
})

app.post("/Authentification",(req,res)=>{
  const {name,email,password} = req.body;
  Usermodel.findOne({email:email})
  .then(user=>{
    if(user){
      res.json("Mail already Exist");
    }
    else{
    Usermodel.create(req.body)
      .then(users => res.json(users))
      .catch(err => res.json(err))
    }
  })
})

app.post("/comments",(req,res) =>{
  commentmodel.create(req.body)
  .then(comments=>res.json(comments))
  .catch(err=>res.json(err))
})

app.post('/likes',async(req,res)=>{
  try{
    const {commentid,userid}= req.body;
    const comment = await commentmodel.findById(commentid);
   const alreadyliked = comment.likedby.includes(userid)
    if(alreadyliked){
    comment.likes -=1;
    comment.likedby=comment.likedby.filter(id=>id.toString()!==userid.toString());
     
  }else{
   comment.likes+=1;
   comment.likedby.push(userid)
  }
  await comment.save();
  res.json({success:true,likes:comment.likes,likedByUser: !alreadyliked})
}
  catch{
   err=> err.json(err);
  }
})

app.get("/comments",async(req,res)=>{
  try {
    const userid = req.query.userid || "";
    const comments = await commentmodel.find().sort({createat:-1}).lean();

    const updatecomments = comments.map(comment =>({
      ...comment,
     likedByUser: userid && comment.likedby.includes(userid),
    }))
    res.json(updatecomments)
  }
  catch{
    err=>err.json(err)
  }
})

app.post("/Complains",(req,res)=>{
  complainmodule.create(req.body)
  .then(complain => res.json(complain))
  .catch(err=> err.json(err))
})

app.get("/bikes",async(req,res)=>{
  try{
    const bikes = await bikemodule.find();
    res.json(bikes);
  }
  catch{
    err=>err.json(err);
  }
})

app.get("/cars",async(req,res)=>{
  try{
    const cars = await carmodule.find();
    res.json(cars);
  }
  catch{
    err=>err.json(err);
  }
})




app.listen(3001,() =>{
    console.log("server run");
}) 