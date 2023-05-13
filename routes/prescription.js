const router = require("express").Router();

let Prescription = require("../models/Prescription");

router.route("/add").post((req,res)=>{

    const doctor_id = req.body.doctor_id;
    const patient_id = req.body.patient_id;
    const medicine= req.body.medicine;
    

   const newPrescription = new Prescription({
        doctor_id,
        patient_id,
        medicine
    })

    newPrescription.save().then(()=>{
        res.json("Prescription added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.route("/").get((req,res)=>{
    Prescription.find().then((prescription)=>{
        res.json(prescription)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {medicine} = req.body;

    const updatePrescription = {
        
        medicine
    }

    const update = await Prescription.findByIdAndUpdate(userID, updatePrescription).then(()=>{
        res.status(200).send({status:"Prescription updated"})
    }).catch(()=> {
        console.log(err);
        
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await Prescription.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Prescription deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting prescription",error: err.message})
    })
})

router.route("/findOne/:id").post(async(req,res)=>{
    let userId = req.params.id;
    await Prescription.findById(userId).then((prescriptions)=>{
        res.json(prescriptions)
    }).catch((err) =>{
        console.log(err);
    })
})


router.post("/findbyId/:pid", async (req, res) => {
    try {
      let patientID = req.params.pid;
      let prescriptions = await Prescription.find({patient_id : patientID});
      res.json(prescriptions);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  });
  




module.exports = router;
