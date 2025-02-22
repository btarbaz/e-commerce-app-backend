import mongoose, { Document } from 'mongoose';

// Shape of the product
export interface IProduct extends Document {
  title: string;
  price: number;
}

// Define the Product schema
const productSchema = new mongoose.Schema<IProduct>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>('Product', productSchema);
