const mongoose = require('mongoose');
const colors = require('colors')

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB ${mongoose.connection.host}`.bgGreen.white)
    }
    catch(err){
        console.log("MONGO ERROR".bgRed.white)
    }
}
module.exports = connectDB
