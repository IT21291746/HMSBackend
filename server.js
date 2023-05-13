require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

//express app
const app = express()

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    //useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    //useFindAndModify: false
});


const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb conncetion succesful!")
}) 

app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`)
})



const patientRouter = require("./routes/patients.js");
const testRouter = require("./routes/tests.js");
const employeeRouter = require("./routes/employee.js");
const inventoryRouter = require("./routes/inventory.js");
const orderRouter = require("./routes/order.js");
const resultRouter = require("./routes/result.js");
const doctorRouter = require("./routes/doctor.js");
const pharmacyRouter = require("./routes/pharmacy.js");
const medicineRouter = require("./routes/medicine.js");
const currentresourcesRouter = require("./routes/currentresources.js");
const substaticresourcesRouter = require("./routes/substaticresources.js");
const staticresourcesRouter = require("./routes/staticresources.js");
const medicalrecordsRouter = require("./routes/medicalrecords.js");
const prescriptionRouter = require("./routes/prescription.js");

app.use("/patient", patientRouter);
app.use("/employee", employeeRouter);
app.use("/test", testRouter);
app.use("/inventory", inventoryRouter);
app.use("/order", orderRouter);
app.use("/result", resultRouter);
app.use("/doctor", doctorRouter);
app.use("/pharmacy", pharmacyRouter);
app.use("/medicine", medicineRouter);
app.use("/currentresources", currentresourcesRouter);
app.use("/staticresources", staticresourcesRouter);
app.use("/substaticresources", substaticresourcesRouter);
app.use("/medicalrecords", medicalrecordsRouter);
app.use("/prescription", prescriptionRouter);