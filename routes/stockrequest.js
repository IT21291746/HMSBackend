const router = require("express").Router();
const mongoose = require('mongoose');
let CurrentResourcesRequest = require("../models/StockRequest.js");

router.route("/add").post((req,res)=>{

    const csid = req.body.csid;
    const name = req.body.name;
    const availablenumber = Number(req.body.availablenumber);
    const requestedamount = Number(req.body.requestedamount);
    const threshold = Number(req.body.threshold);
    const unitprice = Number(req.body.unitprice);

    const newCurrentResourcesRequest = new CurrentResourcesRequest({
        csid,
        name,
        availablenumber,
        requestedamount,
        threshold,
        unitprice,
    })

    newCurrentResourcesRequest.save().then(()=>{
        res.json("CurrentResourcesRequest added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.route("/").get((req,res)=>{
    CurrentResourcesRequest.find().then((currentresourcesrequests)=>{
        res.json(currentresourcesrequests)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {csid, name, availablenumber,requestedamount, threshold, unitprice} = req.body;

    const updateCurrentResourcesRequest = {
        csid,
        name,
        availablenumber,
        requestedamount,
        threshold,
        unitprice
    }
try{
    const update = await CurrentResourcesRequest.findByIdAndUpdate(userID,updateCurrentResourcesRequest);
        res.status(200).send({status:"Successfull update"});
        }catch(err){
    console.log(err);
        res.status(500).send({status:"Error with user update",error:err.message})
    }
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await CurrentResourcesRequest.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting currentresourcesrequest",error: err.message})
    })
})


router.route("/findOne/:id").post(async(req,res)=>{
    let userId = req.params.id;
    await CurrentResourcesRequest.findById(userId).then((currentresourcesrequests)=>{
        res.json(currentresourcesrequests)
    }).catch((err) =>{
        console.log(err);
    })
})



module.exports = router;
