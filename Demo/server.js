const routes =require("./routes.js")
const express =require('express');
const {mongoose} = require ('mongoose');

const app =express();
const PORT =3000;
app.listen(PORT,()=>{
console.log(`Server is running on the port ${PORT}`);
});
app.use(express.json());
app.use('/',routes);

mongoose.connect("mongodb://localhost:27017/demo1")

const database =mongoose.connection;
database.on("error",(error)=>{
    console.log("error");
});
database.once("connected",()=>{
    console.log("Database Connected");
});