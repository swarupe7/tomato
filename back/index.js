const express = require("express");
const mongoose = require("mongoose");
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const cors=require('cors');
const uploadController = require("./controllers/uploadController");
const app = express();
app.use(cors());



const dotenv=require('dotenv').config();




app.use(express.json());
app.use(express.urlencoded({extended:true}));



// const db = config.get("mongoURI");
mongoose.set('strictQuery',false);
mongoose
  .connect("mongodb+srv://20pa1a05e7:20pa1a05e7@cluster0.pmlrv24.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("💻 Mondodb Connected"))
  .catch(err => console.error(err));


app.use('/auth',authController);

app.use('/product',productController);
app.use('/images', express.static('public/images'))
app.use('/upload',uploadController);



app.get("/", (req, res) => {
  res.send("Server working 🔥");
});


const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));