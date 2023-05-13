const router = require("express").Router();

let Patient = require("../models/Patient");

router.route("/add").post((req,res)=>{

    const patient_id = req.body.patient_id;
    const name = req.body.name;
    const sex = req.body.sex;
    const age = Number(req.body.age);
    const address = req.body.address;
    const contact_number = req.body.contact_number;

    const newPatient = new Patient({
        patient_id,
        name,
        sex,
        age,
        address,
        contact_number
    })

    newPatient.save().then(()=>{
        res.json("Patient added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.route("/").get((req,res)=>{
    Patient.find().then((patients)=>{
        res.json(patients)
    }).catch((err)=>{
        console.log(err)
    })
})


router.post("/findbyId/:pid", async (req, res) => {
    try {
      let patientID = req.params.pid;
      let orders = await Patient.find({patient_id : patientID});
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  });

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {patient_id, name, sex, age, address, contact_number} = req.body;

    const updatePatient = {
        patient_id,
        name,
        sex,
        age,
        address,
        contact_number
    }

    const update = await Patient.findByIdAndUpdate(userID, updatePatient).then(()=>{
        res.status(200).send({status:"User updated"})
    }).catch(()=> {
        console.log(err);
        
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await Patient.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting patient",error: err.message})
    })
})


router.route("/findOne/:id").post(async(req,res)=>{
    let userId = req.params.id;
    await Patient.findById(userId).then((patients)=>{
        res.json(patients)
    }).catch((err) =>{
        console.log(err);
    })
})


router.post("/maxId", async (req, res) => {
    try {
      const result = await Patient.findOne().sort({ patient_id: -1 });
      const maxId = result ? result.patient_id : "0";
      res.json({ maxId });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  


module.exports = router;
