import { Model, Schema, model } from 'mongoose';
import { ITask, IUser} from '../interfaces/task.interface'; 

const UserSchema:Schema<IUser> = new Schema<IUser>(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      fullName: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        select: false,
      },
    },
    {
      timestamps: true,
    }
  );
  UserSchema.pre<IUser>('save', async function(next) {
    if (this.isModified('username')) {
      this.username = this.username.toLowerCase();
    }
    next();
  });

const TaskSchema : Schema<ITask> = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: Date,
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TaskModel:Model<ITask> = model<ITask>('Task', TaskSchema);
export const UserModel:Model<IUser> = model<IUser>('User', UserSchema);

