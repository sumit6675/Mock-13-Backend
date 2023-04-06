require("dotenv").config();
const express = require("express");
const { AppointmentModel } = require("../models/appointment.model");
const AppointmentRoute = express.Router();

AppointmentRoute.post("/appointments", async (req, res) => {
  const {
    name,
    image,
    specialization,
    experience,
    location,
    date,
    slots,
    fee,
  } = req.body;
  try {
    const appointment = new AppointmentModel({
      name,
      image,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    });
    await appointment.save();
    res.status(201).json({ msg: "Appointment Added" });
  } catch (err) {
    console.log("err", err);
    res.status(401).json({ msg: err });
  }
});

AppointmentRoute.get("/",async(req,res)=>{
  const {page=1,limit=4}=req.query
  const{filter,search}=req.query
  try{
      if(filter==="Cardiologist"){
        let data=await AppointmentModel.find({specialization:"Cardiologist"})
        .limit(limit*1)
        .skip((page-1)*limit)
        res.status(201).json({ data: data });
      }else if(filter==="Dermatologist"){
        let data=await AppointmentModel.find({specialization:"Dermatologist"})
        .limit(limit*1)
        .skip((page-1)*limit)
        res.status(201).json({ data: data });
      }else if(filter==="Pediatrician"){
        let data=await Pediatrician.find({specialization:"Pediatrician"})
        .limit(limit*1)
        .skip((page-1)*limit)
        res.status(201).json({ data: data });
      }else if(filter==="Psychiatrist"){
        let data=await AppointmentModel.find({specialization:"Psychiatrist"})
        .limit(limit*1)
        .skip((page-1)*limit)
        res.status(201).json({ data: data });
      }else if(search){
        let data=await AppointmentModel.find()
        let filterData=data.filter((i)=>i.name.toLowerCase().includes(search.toLowerCase()))
        res.status(201).json({ data: filterData });
      }else{
        let data=await AppointmentModel.find()
        .limit(limit*1)
        .skip((page-1)*limit)
        res.status(201).json({ data: data });
      }
  }catch(err){
    console.log("err", err);
    res.status(401).json({ msg: err });
  }
})

AppointmentRoute.patch("/book/:id",async(req,res)=>{
  const id=req.params.id
  let data= await AppointmentModel.findById(id)
  try{
    await AppointmentModel.findByIdAndUpdate(id,{
      slots:data.slots-1
    })
    res.status(201).json({ msg: "update slot" });
  }catch(err){
    console.log("err", err);
    res.status(401).json({ msg: err });
  }
})

module.exports = {
  AppointmentRoute,
};
