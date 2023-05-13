const router = require("express").Router();

let Pharmacy = require("../models/Pharmacy");

router.route("/add").post((req,res)=>{

    const pharmacy_id = req.body.pharmacy_id;
    const name = req.body.name;
    const sex = req.body.sex;
    const age = Number(req.body.age);
    const address = req.body.address;
    const contact_number = req.body.contact_number;

    const newPharmacy = new Pharmacy({
        pharmacy_id,
        name,
        sex,
        age,
        address,
        contact_number
    })

    newPharmacy.save().then(()=>{
        res.json("Pharmacy added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.route("/").get((req,res)=>{
    Pharmacy.find().then((pharmacys)=>{
        res.json(pharmacys)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {pharmacy_id, name, sex, age, address, contact_number} = req.body;

    const updatePharmacy = {
        pharmacy_id,
        name,
        sex,
        age,
        address,
        contact_number
    }

    const update = await Pharmacy.findByIdAndUpdate(userID, updatePharmacy).then(()=>{
        res.status(200).send({status:"User updated"})
    }).catch(()=> {
        console.log(err);
        
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await Pharmacy.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting pharmacy",error: err.message})
    })
})



module.exports = router;
