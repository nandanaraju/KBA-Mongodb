const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    BlogID: String,
    title: String,
    author: String,
    content: String,
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
