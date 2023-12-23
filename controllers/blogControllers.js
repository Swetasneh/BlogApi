const  mongoose  = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/models');


exports.getAllBlogsController = async(req,res)=>{
    try{
       const blogs = await blogModel.find({});
       if(!blogs){
        return res.status(200).send({
            success: false,
            message: 'No blog found'
        })
       }
       return res.status(200).send({
        success: true,
        message: 'All blog found',
        BlogCount: blogs.length,
        blogs
       })
    }
    catch(err){
        console.error(err);
        return res.status(500).send({
            success: false,
            message:'error in getting all blogs',
            err
        })
    }

}

exports.createBlogController = async(req,res) =>{
    try{
      const {title,description,user}= req.body;
      if(!title || !description || !user ){
        res.status(400).send({
            success: false,
            message: 'Enter all details',
            
        })
      }
      
       const existingUser = await userModel.findById(user)

       if(!existingUser){
        return res.status(404).send({   
            success: false,
            message: 'unable to find user'
            
        })
    }


       newBlog = new blogModel({title, description,user})

       const session = await mongoose.startSession()
       session.startTransaction()
       await newBlog.save({session})
       existingUser.blogs.push(newBlog)
       await existingUser.save({session})
       await session.commitTransaction()
       await newBlog.save();
       return res.status(200).send({
        success: true,
        message: 'Blog created successfully',
        newBlog
       })
    }
    catch(err){
        console.error(err);
        return res.status(400).send({
            success: false,
            message: 'Error creating blog',
            err
        })
    }

  
}

exports.getBlogController=async(req,res)=>{
    try{
        const {id} = req.params
        const blog = await blogModel.findById(id)
        if(!blog) return res.status(404).send({
            success: false,
            message: 'Blog not found with this id',

        })
        res.status(200).send({
            success: true,
            message: 'Blog found successfully',
            blog
        })
    }
    catch(err){
        console.error(err);
        res.status(404).send({
            success: false,
            message: 'Error getting single blog',
            err
        })
    }
}

exports.updateBlogController=async(req,res)=>{
    try{
      
        const {id}=req.params
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            success: true,
            message: 'Updated',
            blog
        })

    }
    catch(err){
        console.log(err);
        return res.status(400).send({
            success: false,
            message: 'Error updating blog',
            err

        })
    }

}

exports.deleteBlogController = async(req,res)=>{
    try{
        

        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        return res.status(200).send({
            success: true,
            message: 'Deleted'
        })

    }
    catch(err){
        console.log(err);
        return res.status(400).send({
            success: false,
            message: 'Error deleting blog',
            err
        })
    }

}


exports.userBlogController=async(req,res)=>{
    try{
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(404).send({
                success: false, 
                message: 'Blog not found  with this user',
            })

        }
        return res.status(200).send({
            success:true,
            message: 'Blog successfully retrieved by the user',
            userBlog
        })



    }
    catch(err){
        console.log(err);   
        return res.status(400).send({
            success: false, 
            message: 'Error getting user blogs',
            err})
    }

}