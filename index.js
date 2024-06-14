require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 7000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const userRoutes=require('./routes/userRoutes');

app.use(userRoutes)




app.listen(port,()=>{
  console.log(`sucessfully connected to the server on port ${port}`)
})