const router = require("express").Router();
const mongoose = require('mongoose');
let CurrentResources = require("../models/CurrentResources");

router.route("/add").post((req,res)=>{

    const csid = req.body.csid;
    const name = req.body.name;
    const availablenumber = Number(req.body.availablenumber);
    const threshold = Number(req.body.threshold);
    const unitprice = Number(req.body.unitprice);

    const newCurrentResources = new CurrentResources({
        csid,
        name,
        availablenumber,
        threshold,
        unitprice,
    })

    newCurrentResources.save().then(()=>{
        res.json("CurrentResources added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.post("/maxId", async (req, res) => {
    try {
      const result = await CurrentResources.findOne().sort({ csid: -1 });
      const maxId = result ? result.csid : "CRID_100";
      res.json({ maxId });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  


router.route("/").get((req,res)=>{
    CurrentResources.find().then((currentresourcess)=>{
        res.json(currentresourcess)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {csid, name, availablenumber, threshold, unitprice} = req.body;

    const updateCurrentResources = {
        csid,
        name,
        availablenumber,
        threshold,
        unitprice
    }
try{
    const update = await CurrentResources.findByIdAndUpdate(userID,updateCurrentResources);
        res.status(200).send({status:"Successfull update"});
        }catch(err){
    console.log(err);
        res.status(500).send({status:"Error with user update",error:err.message})
    }
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await CurrentResources.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting currentresources",error: err.message})
    })
})


router.route("/findOne/:id").post(async(req,res)=>{
    let userId = req.params.id;
    await CurrentResources.findById(userId).then((currentresourcess)=>{
        res.json(currentresourcess)
    }).catch((err) =>{
        console.log(err);
    })
})



module.exports = router;
