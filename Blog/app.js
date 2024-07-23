const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const BlogPost = require('./blogdetails'); 

dotenv.config();

const app = express();


const uri = process.env.mongo_uri;


mongoose.connect(uri);

const database = mongoose.connection;
database.on('error', (error) => {
    console.log('Error connecting to database:', error);
});
database.once('connected', () => {
    console.log('Database Connected');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4000;

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.get('/submitted', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submit.html'));
});

app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewblog.html'));
});

app.get('/viewallblogs', async (req, res) => {
    try {
        const blogs = await BlogPost.find();
        res.json(blogs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving blog posts' });
    }
});

app.post('/blog', async (req, res) => {
    const { BlogID, title, author, content } = req.body;
    const newPost = new BlogPost({ BlogID, title, author, content });
    try {
        await newPost.save();
        console.log(newPost);
        res.redirect('/submitted');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error saving blog post' });
    }
});

app.get('/blog/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await BlogPost.findOne({ BlogID: id });
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        res.sendFile(path.join(__dirname, 'public', 'viewblog.html'));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving blog post' });
    }
});

app.get('/api/blog/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await BlogPost.findOne({ BlogID: id });
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving blog post' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
