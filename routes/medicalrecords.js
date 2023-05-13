const router = require("express").Router();
const mongoose = require('mongoose');
let MedicalRecords = require("../models/MedicalRecords");

router.route("/add").post((req,res)=>{

    const patient_id = req.body.patient_id;
    const medicalrecords = req.body.medicalrecords;

    const newMedicalRecords = new MedicalRecords({
        patient_id,
        medicalrecords,
    })

    newMedicalRecords.save().then(()=>{
        res.json("MedicalRecords added")
    }).catch((err)=>{
        console.log(err);
        
    }) 

})

router.route("/").get((req,res)=>{
    MedicalRecords.find().then((medicalrecords)=>{
        res.json(medicalrecords)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {patient_id, medicalrecords} = req.body;

    const updateMedicalRecords = {
        patient_id,
        medicalrecords
    }
try{
    const update = await MedicalRecords.findByIdAndUpdate(userID,updateMedicalRecords);
        res.status(200).send({status:"Successfull update"});
        }catch(err){
    console.log(err);
        res.status(500).send({status:"Error with user update",error:err.message})
    }
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await MedicalRecords.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting medicalrecords",error: err.message})
    })
})


router.route("/findOne/:id").post(async(req,res)=>{
    let userId = req.params.id;
    await MedicalRecords.findById(userId).then((medicalrecords)=>{
        res.json(medicalrecords)
    }).catch((err) =>{
        console.log(err);
    })
})


router.post("/findbyId/:pid", async (req, res) => {
    try {
      let patientID = req.params.pid;
      let medicalRecords = await MedicalRecords.find({patient_id : patientID});
      res.json(medicalRecords);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  });
  

module.exports = router;
