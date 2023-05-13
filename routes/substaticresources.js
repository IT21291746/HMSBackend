const router = require("express").Router();
const mongoose = require('mongoose');
let SubStaticResources = require("../models/SubStaticResources");

router.route("/add").post((req,res)=>{

    const ssrid = req.body.ssrid;
    const srid = req.body.srid;
    const availability = req.body.availability;
    const location = req.body.location;
    const condition = req.body.condition;
    
    const newSubStaticResources = new SubStaticResources({
        ssrid,
        srid,
        availability,
        location,
        condition
    })

    newSubStaticResources.save().then(()=>{
        res.json("SubStaticResources added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.route("/").get((req,res)=>{
    SubStaticResources.find().then((substaticresources)=>{
        res.json(substaticresources)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {ssrid,srid, availability,location,condition} = req.body;

    const updateSubStaticResources = {
        ssrid,
        srid,
        availability,
        location,
        condition
    }
try{
    const update = await SubStaticResources.findByIdAndUpdate(userID,updateSubStaticResources);
        res.status(200).send({status:"Successfull update"});
        }catch(err){
    console.log(err);
        res.status(500).send({status:"Error with user update",error:err.message})
    }
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await SubStaticResources.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting substaticresources",error: err.message})
    })
})


router.route("/findOne/:id").post(async(req,res)=>{
    let userId = req.params.id;
    await SubStaticResources.findById(userId).then((substaticresources)=>{
        res.json(substaticresources)
    }).catch((err) =>{
        console.log(err);
    })
})


router.post("/findbyId/:pid", async (req, res) => {
    try {
      let ID = req.params.pid;
      let staticresources = await SubStaticResources.find({srid : ID});
      res.json(staticresources);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  });
 

  router.post("/maxId", async (req, res) => {
    try {
      const result = await SubStaticResources.findOne().sort({ ssrid: -1 });
      const maxId = result ? result.ssrid : "SSRID1001";
      res.json({ maxId });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });



module.exports = router;
