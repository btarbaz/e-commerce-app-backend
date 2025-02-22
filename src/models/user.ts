import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Shape of the user
export interface IUser extends Document {
  username: string;
  password: string;
}

// Define the User schema
const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash the password before saving the user
userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model<IUser>('User', userSchema);
