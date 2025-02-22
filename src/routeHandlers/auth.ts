import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const router = Router();

// @descr  Register User
// @route  POST api/auth/register
// @access Public
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // If username already exist in database
    const userExist = await User.findOne({ username });
    if (userExist) {
      res.status(400);
      throw new Error('User already exists');
    }
    // Create a new user
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// @descr  Login User
// @route  POST api/auth/login
// @access Public
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '12h',
    });

    res.json({ username, token });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
