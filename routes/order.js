const router = require("express").Router();

let Order = require("../models/Order");

router.route("/add").post((req,res)=>{

    const order_id = req.body.order_id;
    const doctor_id = req.body.doctor_id;
    const patient_id = req.body.patient_id;
    const testtype= req.body.testtype;
    const priority = req.body.priority;
    const status = req.body.status;
    

   const newOrder = new Order({
        order_id,
        doctor_id,
        patient_id,
        testtype,
        priority,
        status
    })

    newOrder.save().then(()=>{
        res.json("Order added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.route("/").get((req,res)=>{
    Order.find().then((order)=>{
        res.json(order)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {status,priority,testtype,reportUrl} = req.body;

    const updateOrder = {
        testtype,
        priority,
        status,
        reportUrl
    }

    const update = await Order.findByIdAndUpdate(userID, updateOrder).then(()=>{
        res.status(200).send({status:"Order updated"})
    }).catch(()=> {
        console.log();
        
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await Order.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Order deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting order",error: err.message})
    })
})

router.route("/findOne/:id").post(async(req,res)=>{
    let userId = req.params.id;
    await Order.findById(userId).then((orders)=>{
        res.json(orders)
    }).catch((err) =>{
        console.log(err);
    })
})


router.post("/findbyId/:pid", async (req, res) => {
    try {
      let patientID = req.params.pid;
      let orders = await Order.find({patient_id : patientID});
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  });


  router.post("/findbyRID/:rid", async (req, res) => {
    try {
      let result_id = req.params.rid;
      let result = await Order.findOne({order_id : result_id});
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  });

  router.post("/findbyDID/:did", async (req, res) => {
    try {
      let doctor_id = req.params.did;
      let result = await Order.find({doctor_id : doctor_id});
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  });

  router.post("/maxId", async (req, res) => {
    try {
      const result = await Order.findOne().sort({ order_id: -1 });
      const maxId = result ? result.order_id : "0";
      res.json({ maxId });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  




module.exports = router;
