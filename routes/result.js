const router = require("express").Router();
const PDFDocument = require("pdfkit");
const streamBuffers = require("stream-buffers");

let Result = require("../models/Result");

router.route("/add").post((req,res)=>{

    const result_id = req.body.result_id;
    const order_id = req.body.order_id;
    const patient_id = req.body.patient_id;
    const testtype = req.body.testtype;
    const status = req.body.status;
    
    const newResult = new Result({
        result_id,
        order_id,
        patient_id,
        testtype,
        status
    })

    newResult.save().then(()=>{
        res.json("Result added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.route("/").get((req,res)=>{
    Result.find().then((results)=>{
        res.json(results)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {result_id,patient_id, order_id, testtype,status} = req.body;

    const updateResult = {
        result_id,
        patient_id,
        order_id, 
        testtype,
        status
        }

    const update = await Result.findByIdAndUpdate(userID, updateResult).then(()=>{
        res.status(200).send({status:"Result updated"})
    }).catch(()=> {
        console.log(err);
        
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await Result.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Result deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting result",error: err.message})
    })
})


router.route("/findByID/:id").post(async(req,res)=>{
    let userId = req.params.id;
    await Result.findById(userId).then((results)=>{
        res.json(results)
    }).catch((err) =>{
        console.log(err);
    })
})


router.route("/findOne/:oid").post(async(req,res)=>{
    let order_id = req.params.oid;
    await Result.findOne({ order_id: order_id }).then((result)=>{
        res.json(result);
    }).catch((err) =>{
        console.log(err);
    });
});


router.route("/report/:id").get(async (req, res) => {
  const result = await Result.findById(req.params.id);

  if (!result) {
    return res.status(404).send({ message: "Result not found" });
  }

  const doc = new PDFDocument();
  const stream = new streamBuffers.WritableStreamBuffer();

  // Write the report data to the PDF document
  doc.text("Vadakachchi Hospital", { align: "center" });
  doc.moveDown;
  doc.text(`Result ID: ${result.result_id}`);
  doc.text(`Patient ID: ${result.patient_id}`);
  doc.text(`Status: ${result.status}`);

  // Finish and send the PDF document
  doc.pipe(stream);
  doc.end();
  stream.on("finish", function () {
    res.setHeader(
      "Content-disposition",
      "attachment; filename=result.pdf"
    );
    res.setHeader("Content-type", "application/pdf");
    res.send(stream.getContents());
  });
});


router.route("/report/download/:id").get(async (req, res) => {
    let id = req.params.id;
    const result = await Result.findOne({order_id: id});
    if (!result) {
      return res.status(404).send({ message: "Result not found" });
    }
  
    const doc = new PDFDocument();
    const stream = new streamBuffers.WritableStreamBuffer();
  
    // Write the report data to the PDF document
    doc.text("Vadakachchi Hospital", { align: "center" });
    doc.moveDown;
    doc.text(`Result ID: ${result.result_id}`);
    doc.text(`Patient ID: ${result.patient_id}`);
    doc.text(`Status: ${result.status}`);
  
    // Finish and send the PDF document
    doc.pipe(stream);
    doc.end();
    stream.on("finish", function () {
      res.setHeader(
        "Content-disposition",
        "attachment; filename=result.pdf"
      );
      res.setHeader("Content-type", "application/pdf");
      res.send(stream.getContents());
    });
  });
  
  

router.post("/maxId", async (req, res) => {
    try {
      const result = await Result.findOne().sort({ result_id: -1 });
      const maxId = result ? result.result_id : "RID_1000";
      res.json({ maxId });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  




module.exports = router;
