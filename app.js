const express = require('express');
const app = express();
const Ps = require('./api/routes/posts')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')

mongoose.connect('mongodb+srv://BharatPost:BharatPost@bharatpost.hfjzz9k.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',err =>{
    console.log('connection failed')
})

mongoose.connection.on('connected',connected => {
    console.log('connected with database....')
})



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(fileUpload({
    useTempFiles:true
}))

app.use('/posts',Ps);

app.use((req,res,next)=>{
    res.status(404).json({
        msg:'Bad Request'
    })
})
app.use((req,res,next)=>{
    res.status(200).json({
        message:'api is working'
    })
})

module.exports = app;