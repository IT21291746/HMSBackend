const router = require("express").Router();
const mongoose = require('mongoose');
let Doctor = require("../models/Doctor");

router.route("/add").post((req,res)=>{

    const doctor_id = req.body.doctor_id;
    const name = req.body.name;
    const specialization = req.body.specialization;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const contact_number = req.body.contact_number;
    const password = req.body.password;

    const newDoctor = new Doctor({
        doctor_id,
        name,
        specialization,
        age,
        gender,
        contact_number,
        password
    })

    newDoctor.save().then(()=>{
        res.json("Doctor added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.route("/").get((req,res)=>{
    Doctor.find().then((doctors)=>{
        res.json(doctors)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {doctor_id, name, specialization, age, gender, contact_number,password} = req.body;

    const updateDoctor = {
        doctor_id,
        name,
        specialization,
        age,
        gender,
        contact_number,
        password
    }
try{
    const update = await Doctor.findByIdAndUpdate(userID,updateDoctor);
        res.status(200).send({status:"Successfull update"});
        }catch(err){
    console.log(err);
        res.status(500).send({status:"Error with user update",error:err.message})
    }
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await Doctor.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting doctor",error: err.message})
    })
})


router.route("/findOne/:id").post(async(req,res)=>{
    let userId = req.params.id;
    await Doctor.findById(userId).then((doctors)=>{
        res.json(doctors)
    }).catch((err) =>{
        console.log(err);
    })
})

router.post("/maxId", async (req, res) => {
    try {
      const result = await Doctor.findOne().sort({ doctor_id: -1 });
      const maxId = result ? result.doctor_id : "0";
      res.json({ maxId });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  




module.exports = router;
