import mongoose, { Document } from 'mongoose';

// Shape of the cart
export interface ICartProduct {
  productId: mongoose.Types.ObjectId;
  id: number;
  title: string;
  quantity: number;
  price: number;
}

export interface ICart extends Document {
  userId?: mongoose.Types.ObjectId;
  products: ICartProduct[];
}

// Define the Cart schema
const cartSchema = new mongoose.Schema<ICart>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      title: { type: String },
      quantity: { type: Number, default: 1 },
      price: { type: Number },
    },
  ],
});

export default mongoose.model<ICart>('Cart', cartSchema);
