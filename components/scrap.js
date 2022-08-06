const puppeteer = require('puppeteer');
const priceList=require('../model/price');
const mongo=require('../connect');

module.exports={
    Price:()=>{
        const goldPrice=async()=>{
           try{
            var cities=['mumbai','chennai','delhi','hyderabad','bangalore','goa','kerala','kolkatta'];
            for(i=0;i<cities.length;i++){
                const url=`https://www.goldpricesindia.com/cities/${cities[i]}`
                const browser=await puppeteer.launch();
                const page = await browser.newPage()
            
                await page.goto(url);
                const [el]=await page.$x('/html/body/div[2]/div[2]/div[1]/aricle/div[1]/div/div[1]')
                const txt=await el.getProperty('textContent');
                const price=await txt.jsonValue();
                const res=price.trim().split('\n');
                const rate=res[0].trim().replace(/,/g, '');
                const dateTime=res[2].trim();
                
                // priceList.create({
                //     city:cities[i],
                //     price:rate,
                //     dateTime:dateTime
                // })
                
                        
                    (async () => {
                        try {
                            var myquery = { city:cities[i] };
                            var newvalues = {$set: {price:rate,dateTime:dateTime} };
                            await priceList.updateMany(myquery, newvalues, function(err, res) {
                                if (err) return{error: err}
                                console.log(res.nModified+"document(s) updated")
                            });
                            
                        } catch (error) {
                            console.log(error)
                        }
                      }
                    )();
                browser.close();
              
            }
        }
        catch(error){
            console.log(error)
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
