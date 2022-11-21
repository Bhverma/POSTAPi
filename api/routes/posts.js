const express = require('express');

const router = express.Router();
const Posts = require('../routes/models/Posts');
const  mongoose  = require('mongoose');
const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
    cloud_name: 'dt8e3lgxz', 
    api_key: '491795881885938', 
    api_secret: 'xb4YNg8NyA5urhEO5WNvuS1oZS4',
    secure: true
});


router.get('/',(req,res,next)=>{
   Posts.find()
   .then(result=>{
        res.status(200).json({
            postData:result
        });
   })
   .catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
   });
})

router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Posts.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            Posts:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.post('/',(req,res,next)=>{
    console.log(req.body);
    const file = req.files.PostImage;
    console.log(file)
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
       
        const posts = new Posts({
        _id: new mongoose.Types.ObjectId,
        PostTitle: req.body.PostTitle,
        PostDate: req.body.PostDate,
        PostDesc: req.body.PostDesc,
        PostImage: result.url,
        PostLikes: req.body.PostLikes
    }) 

    posts.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newPost:result
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    });






    
})

router.delete('/:PostTitle',(req,res,next)=>{
    console.log(req.params.PostTitle);
    Posts.findOneAndDelete(req.params.PostTitle)
        .then(result=>{
            res.status(200).json({
                Posts:result
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })

})

router.put('/:PostTitle',(req,res,next)=>{
    console.log(req.params.PostTitle);
    Posts.findOneAndUpdate({PostTitle: req.params.PostTitle},{
        $set:{
            
            PostDate: req.body.PostDate,
            PostDesc: req.body.PostDesc,
            PostImage: req.body.PostImage,
            PostLikes: req.body.PostLikes
        }
    })
    .then(result=>{
        res.status(200).json({
            Updated_Post:result
        })

    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


module.exports =   router;