const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			res.status(400);
			throw new Error("Please provide name, email, and password");
		}

		const userExists = await User.findOne({ email });
		if (userExists) {
			res.status(400);
			throw new Error("Email already in use");
		}

		const user = await User.create({ name, email, password });

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} catch (err) {
		next(err);
	}
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(400);
			throw new Error("Please provide email and password");
		}

		// password is select: false on the model, so it must be explicitly requested
		const user = await User.findOne({ email }).select("+password");

		if (!user || !(await user.matchPassword(password))) {
			res.status(401);
			throw new Error("Invalid email or password");
		}

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} catch (err) {
		next(err);
	}
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
const getCurrentUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);

		if (!user) {
			res.status(404);
			throw new Error("User not found");
		}

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = { registerUser, loginUser, getCurrentUser };
