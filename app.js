const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true })); // for correct req.body parsing

// routes
app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port') || 5000;

async function start() {
	try {
		await mongoose.connect(
			// config.get('mongoUri'),
			"mongodb+srv://pavel:49iPFM7LbnfeKGwT@cluster0-bvo9t.azure.mongodb.net/app?retryWrites=true&w=majority",
		{
			useNewUrlParser: true
			,useUnifiedTopology: true
			,useCreateIndex: true
		})
		console.log('MongoDB connected')
		app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
	} catch (e) {
		console.log('Server Error', e.message);
		process.exit(1);
	}
}

start();