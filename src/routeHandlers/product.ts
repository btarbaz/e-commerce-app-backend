import { Request, Response } from 'express';
import Product from '../models/product';

// @descr  Fetch products
// @route  POST /api/product/
// @access public
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
