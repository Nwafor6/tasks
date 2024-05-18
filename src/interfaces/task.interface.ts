import { Document,Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    email:string;
    fullName:string
  }
  
export interface ITask extends Document {
  title: string;
  description: string;
  dueDate?: Date;
  completed: boolean;
  owner:Schema.Types.ObjectId,;
  createdAt: Date;
  updatedAt: Date;
}
