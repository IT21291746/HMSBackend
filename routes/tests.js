const router = require("express").Router();

let Test = require("../models/Test");

router.route("/add").post((req,res)=>{

    const test_id = req.body.test_id;
    const test_name = req.body.test_name;
    const description = req.body.description;
    const cost = Number(req.body.cost);

    const newTest = new Test({
        test_id,
        test_name,
        description,
        cost
    })

    newTest.save().then(()=>{
        res.json("New test added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.route("/").get((req,res)=>{
    Test.find().then((tests)=>{
        res.json(tests)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {test_id,test_name,description,cost} = req.body;

    const updateTest = {
        test_id,
        test_name,
        description,
        cost
    }

    const update = await Test.findByIdAndUpdate(userID, updateTest).then(()=>{
        res.status(200).send({status:"Test updated"})
    }).catch(()=> {
        console.log(err);
        
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await Test.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Test deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting Test",error: err.message})
    })
})



module.exports = router;
