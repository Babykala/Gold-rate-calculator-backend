const puppeteer = require('puppeteer');
const priceList=require('../model/price');
const mongo=require('../connect');

module.exports={
    Price:()=>{
        const goldPrice=async()=>{
           
            var cities=['mumbai','chennai','delhi','hyderabad','bangalore','goa','kerala','kolkatta'];
            for(i=0;i<cities.length;i++){
                const url=`https://www.goldpricesindia.com/cities/${cities[i]}`
                const browser=await puppeteer.launch();
                const page = await browser.newPage()
            
                await page.goto(url);
                const [el]=await page.$x('/html/body/div[2]/div[2]/div[1]/aricle/div[1]/div/div[1]')
                const txt=await el.getProperty('textContent');
                const price=await txt.jsonValue();
                const result=price.trim().split('\n')
                console.log(price)
                
                priceList.create({
                    city:cities[i],
                    price:result[0].trim().replace(/,/g, ''),
                    gram:result[1].trim(),
                    dateTime:result[2]
            
                })
                browser.close();
                // return result
            }
            
          
        }
        const main = async () =>{
            await mongo.connectMongoose();
            const priceList = await goldPrice();
            return priceList;
            }
        
        main();
    }
}
