const express=require('express');
const app=express();
const jwt=require('jsonwebtoken')
require('dotenv').config();
app.use(express.json())

const posts=[
  {
    "name":"Sathish",
    "age":25
},
{
  "name":"Krishna",
  "age":33
}
]

//middleware
const authenticationToken=(req,res,next)=>{
  const authHeader=req.headers['authorization'];
  const token=authHeader && authHeader.split(' ')[1];
  if(!token) return res.sendStatus(401);
  jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
    if(err){
      res.sendStatus(403);
    }
    req.user=user;
    next();
  })
}

app.post('/login',(req,res)=>{
  //Authentication
  const username=req.body.username;
  const user={name:username};
  const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN)
  res.json({accessToken:accessToken})
})

app.get('/posts',authenticationToken,(req,res)=>{
  // res.json(posts.filter)
  console.log(req.user.name);
  res.json(posts.filter(post=>post.name===req.user.name))

})


  app.listen(3000);
  