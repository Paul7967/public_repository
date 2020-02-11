const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
	'/register', 
	// array of middleware
	[     
		check('email', 'Email is incorrect').isEmail(),
		check('password', 'Password length should be between 6 and 20 symbols').isLength({min:6, max:20})
	],
	async (req, res) => {
		try {
			// auth fields validation
			
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Incorrect data during registration'
				})
			}
			
			const {email, password} = req.body;
			const candidate = await User.findOne({ email });
			
			if (candidate) {
				
				return res.status(400).json({ message: 'User already exists' })
			}

			const hashedPassword = await bcrypt.hash(password, 12);
			const user = new User({ email, password: hashedPassword });
			await user.save();

			res.status(201).json({ message: 'User created' });

		} catch (e) {
			res.status(500).json({ message: 'Something is worong. Please, try again.' })
		}
	}
);

// /api/auth/login
router.post(
	'/login',
	// array of middleware
	[     
		check('email', 'Email is incorrect').normalizeEmail().isEmail(),
		check('password', 'Input passwort').exists()
	],
	async (req, res) => {
		try {
			// auth fields validation
			const errors = validationResult(req);
			
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Incorrect data during login'
				})
			}
			
			const {email, password} = req.body;
	
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: 'User not found' });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ message: 'Incorrect password. Please, try again.' })
			}
			
			// autorization with jsonwebtoken
			const token = jwt.sign(
				{ userId: user.id },
				config.get('jwtSecret'),
				{ expiresIn: '1h' }
			);

			res.json({ token, userId: user.id })

		} catch (e) {
			res.status(500).json({ message: 'Something is worong. Please, try again.' })
		}
	}
);

module.exports = router;