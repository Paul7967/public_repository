const {Router} = require('express');
const config = require('config');
const Task = require('../models/Task');
const auth = require('../middleware/auth.middleware');
const router = Router();

const s500_Message = 'Something is worong. Please, try again.';

// api/tasks/add    - add new task
router.post('/add', auth,  async (req, res) => {
	try {
		// создаем задачу в базе
		const task = new Task({
			user_id: req.user.userId,
			...req.body
		});

		await task.save();

		res.status(201).json({ task })
	} catch (e) {
		res.status(500).json({ message: s500_Message });
	}
});

// api/tasks/   - get tasklist
router.get('/', auth, async (req, res) => {
	try {
		const tasks = await Task.find({ user_id: req.user.userId })
		res.json(tasks)
	} catch (e) {
		res.status(500).json({ message: s500_Message });
	}
});

// api/tasks/remove
router.post('/remove', auth, async (req, res) => {
	try {
		await Task.deleteOne({ _id: req.body.id })
		res.status(200).json({ message: "Task deleted" });
	} catch (e) {
		res.status(500).json({ message: s500_Message });
	}
});

// api/tasks/edit
router.post('/edit', auth, async (req, res) => {
	try {
		const { _id, user_id, __v, ...taskData } = req.body;
		await Task.findByIdAndUpdate(_id, taskData)
		res.status(200).json({ message: "Task edited" });
	} catch (e) {
		res.status(500).json({ message: s500_Message });
	}
});


// api/tasks/:id    - get data for one task
router.get('/:id', auth, async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		res.json(task);
	} catch (e) {
		res.status(500).json({ message: s500_Message });
	}
});

module.exports = router;