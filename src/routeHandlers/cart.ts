import { Request, Response } from 'express';
import Cart from '../models/cart';

// Extend the Request interface to include userId
interface AuthRequest extends Request {
  userId?: string;
}

// @descr  Add Product to cart
// @route  POST api/cart/add
// @access Private
export const addToCart = async (req: AuthRequest, res: Response) => {
  const cartBody = req.body;
  try {
    // Find the user's cart or create a new one
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      cart = new Cart({ userId: req.userId, products: [] });
    }
    cart.products = cartBody;

    // Save the cart
    await cart.save();
    res.json({ message: 'cart has been saved' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      res.status(200).json([]);
      return;
    }

    res.status(200).json(cart.products);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
