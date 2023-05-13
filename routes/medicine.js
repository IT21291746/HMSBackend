const router = require("express").Router();

let Medicine = require("../models/Medicine");

router.route("/add").post((req,res)=>{

    const medicine_id = req.body.medicine_id;
    const name = req.body.name;
    const price = req.body.price;
    const dosage = Number(req.body.dosage);
    const quantity = req.body.quantity;

    const newMedicine = new Medicine({
        medicine_id,
        name,
        price,
        dosage,
        quantity,
    })

    newMedicine.save().then(()=>{
        res.json("Medicine added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.route("/").get((req,res)=>{
    Medicine.find().then((medicines)=>{
        res.json(medicines)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {medicine_id, name, price, dosage, quantity} = req.body;

    const updateMedicine = {
        medicine_id,
        name,
        price,
        dosage,
        quantity,
    }

    const update = await Medicine.findByIdAndUpdate(userID, updateMedicine).then(()=>{
        res.status(200).send({status:"Medicine updated"})
    }).catch(()=> {
        console.log(err);
        
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await Medicine.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Medicine deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting medicine",error: err.message})
    })
})


router.route("/findOne/:id").post(async(req,res)=>{
    let userId = req.params.id;
    await Medicine.findById(userId).then((medicines)=>{
        res.json(medicines)
    }).catch((err) =>{
        console.log(err);
    })
})


module.exports = router;
