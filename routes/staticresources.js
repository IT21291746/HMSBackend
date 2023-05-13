const router = require("express").Router();
const mongoose = require('mongoose');
let StaticResources = require("../models/StaticResources");

router.route("/add").post((req,res)=>{

    const srid = req.body.srid;
    const name = req.body.name;
    const availablenumber = 0;


    const newStaticResources = new StaticResources({
        srid,
        name,
        availablenumber,
    })

    newStaticResources.save().then(()=>{
        res.json("StaticResources added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.route("/").get((req,res)=>{
    StaticResources.find().then((staticresources)=>{
        res.json(staticresources)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {srid, name, availablenumber} = req.body;

    const updateStaticResources = {
        srid,
        name,
        availablenumber,
    }
try{
    const update = await StaticResources.findByIdAndUpdate(userID,updateStaticResources);
        res.status(200).send({status:"Successfull update"});
        }catch(err){
    console.log(err);
        res.status(500).send({status:"Error with user update",error:err.message})
    }
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await StaticResources.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting staticresources",error: err.message})
    })
})


router.route("/findOne/:id").post(async(req,res)=>{
    let userId = req.params.id;
    await StaticResources.findById(userId).then((staticresources)=>{
        res.json(staticresources)
    }).catch((err) =>{
        console.log(err);
    })
})



module.exports = router;
