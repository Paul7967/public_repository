const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json({ extended: true })); // for correct req.body parsing

// routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tasks', require('./routes/task.routes'));

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.json(__dirname, 'client', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}


const PORT = config.get('port') || 5000;

async function start() {
	try {
		await mongoose.connect(
			config.get('mongoUri'),
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})
		console.log('MongoDB connected')
		app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
	} catch (e) {
		console.log('Server Error', e.message);
		process.exit(1);
	}
}

start();