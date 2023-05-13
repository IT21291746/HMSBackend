const express = require("express");
const router = require("express").Router();
const Employee = require("../models/Employee");


router.post("/maxId", async (req, res) => {
    try {
      const result = await Employee.findOne().sort({ employee_id: -1 });
      const maxId = result ? result.employee_id : "0";
      res.json({ maxId });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  



router.route("/add").post(async(req,res)=>{

    const employee_id = req.body.employee_id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const sex = req.body.sex;
    const age = Number(req.body.age);
    const address = req.body.address;
    const contact_number = req.body.contact_number;

    const newEmployee = new Employee({
        employee_id,
        name,
        email,
        password,
        sex,
        age,
        address,
        contact_number
    })

    newEmployee.save().then(()=>{
        res.json("Employee added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.route("/").get((req,res)=>{
    Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {employee_id, name,email,password, sex, age, address, contact_number} = req.body;

    const updateEmployee = {
        employee_id,
        name,
        email,
        password,
        sex,
        age,
        address,
        contact_number
    }

    const update = await Employee.findByIdAndUpdate(userID, updateEmployee).then(()=>{
        res.status(200).send({status:"User updated"})
    }).catch(()=> {
        console.log(err);
        
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await Employee.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted sucsesfully"});
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status:"error with deleting employee",error: err.message})
    })
})

router.route("/findOne/:id").post(async(req,res)=>{
    let userId = req.params.id;
    await Employee.findById(userId).then((employees)=>{
        res.json(employees)
    }).catch((err) =>{
        console.log(err);
    })
})





module.exports = router;
