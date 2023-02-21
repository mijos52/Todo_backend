const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const URL ='mongodb+srv://Sinuous9328:%25KAD%5E%21SLJqLc%262@cluster0.lwjxm4u.mongodb.net/?retryWrites=true&w=majority';



app.use(express.json());
app.use(cors());


mongoose.connect(URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({ result });
});

app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});

app.listen(process.env.PORT || 3001)  ;
