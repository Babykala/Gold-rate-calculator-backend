const mongoose=require('mongoose'); 

module.exports = {
    async connectMongoose(){
        try{
            mongoose.connect('mongodb+srv://Babykala:EOuTxOTXqqsPGAKm@cluster0.qy289.mongodb.net/vbrs?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology:true});
            console.log('connection success');
        }
        catch(e){
            console.log(e)
        }
    }
}