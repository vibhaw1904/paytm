const express = require("express");
const  rootRouter=require('./Routes/Index')
const dotenv=require('dotenv')
const cors=require('cors')
const connectDb=require('./Db/db')
dotenv.config(); 
const app =express();
connectDb();
app.use(express.urlencoded({extended:false}))

app.use(cors())
app.use(express.json())
app.use('/api/v1',rootRouter);

const port= process.env.PORT||5000;
app.listen(port,()=>console.log(`app is running on port ${port}`))


