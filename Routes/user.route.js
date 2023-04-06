require("dotenv").config();
const express = require("express");
const { UserModel } = require("../models/user.model");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
userRoute.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const duplicateEmail = await UserModel.find({ email });
    if (duplicateEmail.length > 0) {
      res.status(401).json({ msg: "email already exist" });
    } else {
      bcrypt.hash(password, 8, async (err, hash) => {
        if (err) {
          console.log("err", err);
          res.status(401).json({ msg: err });
        } else {
          const user = new UserModel({
            email,
            password: hash,
          });
          await user.save();
          res.status(201).json({ msg: "Registerd Sucess" });
        }
      });
    }
  } catch (err) {
    console.log("err", err);
    res.status(401).json({ msg: err });
  }
});

userRoute.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, function(err, result) {
               if(result){
                const token=jwt.sign({ userId: user[0]._id }, process.env.privateKey, { expiresIn: '1h' });
                res.status(201).json({
                    msg:"Login Success",
                    Token:token,
                    email:user[0].email,
                    id:user[0]._id
                })
               }else{
                res.status(401).json({ msg: "Wrong Password" });
               }
            });
        }else{
            res.status(401).json({ msg: "Wrong Email" });
        }
    }catch(err){
        console.log("err", err);
        res.status(401).json({ msg: err });
    }
})

module.exports = {
  userRoute,
};
