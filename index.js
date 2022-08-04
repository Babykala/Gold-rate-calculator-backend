const express = require('express');
const {Price} = require('./components/scrap');
const priceModel=require('./model/price')
const cors=require('cors');
require('dotenv').config();
const app = express();

app.use(express.json()); 

const main = () =>{
    console.log('Running website');
   Price();
}

app.use(cors())

app.use('/get',async(req,res,next)=>{
    try{
        const price=await priceModel.find();
        return res.send(price);
        
    }catch(err){
        console.log(err);
    }
})

app.use('/get',async(req,res,next)=>{
    try{
        const price=await priceModel.find();
        return res.send(price);
        
    }catch(err){
        console.log(err);
    }
})
app.use('/create',async(req,res,next)=>{
    const city=new priceModel({...req.body})
        try{
            var response=await city.save();
            res.send(response);
        }
        catch(e){console.log(e)}
})
const port=process.env.PORT||8080

app.listen(port,()=> {
    console.log(`Server running at ${process.env.PORT}`);
    main();
})