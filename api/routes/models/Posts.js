const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    PostTitle: String,
    PostDate: Date,
    PostDesc: String,
    PostImage: String,
    PostLikes: Number,
    
})


module.exports = mongoose.model('Posts',PostSchema);