const router = require("express").Router();

let Inventory = require("../models/Inventory");

router.route("/add").post((req,res)=>{

    const inventory_id = req.body.inventory_id;
    const name = req.body.name;
    const sex = req.body.sex;
    const age = Number(req.body.age);
    const address = req.body.address;
    const contact_number = req.body.contact_number;

    const newInventory = new Inventory({
        inventory_id,
        name,
        sex,
        age,
        address,
        contact_number
    })

    newInventory.save().then(()=>{
        res.json("Inventory added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.route("/").get((req,res)=>{
    Inventory.find().then((inventorys)=>{
        res.json(inventorys)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {inventory_id, name, sex, age, address, contact_number} = req.body;

    const updateInventory = {
        inventory_id,
        name,
        sex,
        age,
        address,
        contact_number
    }

    const update = await Inventory.findByIdAndUpdate(userID, updateInventory).then(()=>{
        res.status(200).send({status:"User updated"})
    }).catch(()=> {
        console.log(err);
        
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await Inventory.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting inventory",error: err.message})
    })
})



module.exports = router;
