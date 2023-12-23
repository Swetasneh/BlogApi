const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true,'title is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref : 'User',
        
    }
    
},{timestamps:true})

const blogModel = mongoose.model('Blog', blogSchema)

module.exports = blogModel;
