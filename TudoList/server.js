const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./model/tudo'); 
require('dotenv').config();
const app = express();
const port = 3001;

const uri = process.env.mongo_uri;

mongoose.connect(uri);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});

app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


app.post('/api/todos', async (req, res) => {
    const { task } = req.body;
    if (task) {
        try {
            const newTodo = new Todo({ task });
            await newTodo.save();
            res.status(201).json(newTodo);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.status(400).json({ error: 'Task content is required' });
    }
});


app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: id },
            { $set: { task } },
            { new: true } 
        );
        if (todo) {
            res.json(todo); 
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Todo.findOneAndDelete({ _id: id });
        if (result) {
            res.status(204).end(); 
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
