import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include userId
interface AuthRequest extends Request {
  userId?: string;
}

// Auth middleware to verify JWT token
const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }

  try {
    // Verify the token and extract the userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    req.userId = decoded.userId;

    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

export default auth;
