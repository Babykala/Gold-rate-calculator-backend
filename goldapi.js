const axios=require('axios');
const { request } = require('express');
const mongo=require('./connect');

module.exports={
    Price:()=>{
    const goldPrice=async()=>{

        var myHeaders = {
            'x-access-token': process.env.apiKey,
            'Content-Type': 'application/json'

        }
        
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        const res=await axios.get(`https://www.goldapi.io/api/XAU/INR/20220804`,requestOptions)
        console.log(res.data)
        
    }

    const main = async () =>{
        await mongo.connectMongoose();
        const priceList = await goldPrice();
        return priceList;
        }
    
    main();
    }
}