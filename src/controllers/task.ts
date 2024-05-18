import { Request, Response } from 'express';
import { TaskModel} from '../models/task.model';
import { successResponse, failedResponse } from '../support/http';
import { writeErrosToLogs } from '../support/helpers';
import { taskJoiSchema, updateTaskJoiSchema } from '../JoiSchema/task.joi';
import { sendNewTaskToClient } from '../socket/sendTask';


export class Task {
    static async addTask(req: Request, res: Response) {
        try {
            // Validate request body against schema
            const { error, value } = taskJoiSchema.validate(req.body);
            if (error) {
                return failedResponse(res, 400, `${error.details[0].message}`)

            }
            value.owner = (req as any).user._id
            // Create new Task
            const newTask =  await TaskModel.create(value);
            const data={
                _id:newTask._id,
                user_id:value.owner,
                title:newTask.title,
                description:newTask.description,
                dueDate:newTask.dueDate,
                completed:newTask.completed,
                createdAt:newTask.createdAt,
                updatedAt:newTask.updatedAt
            }
            const sendTask= sendNewTaskToClient(data)
            return successResponse(res, 201, "Task added successfully.", newTask)

        } catch (error) {
            writeErrosToLogs(error)
            return failedResponse(res, 500);
        }
      };

      static async getTasks(req: Request, res: Response) {
        try {
            const user_id = (req as any).user._id; // Assuming req.user._id is available after authentication
            const filter = req.query.completed;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10; // Default limit to 10 tasks per page
            const skip = (page - 1) * limit;

            let query: { owner: any, completed?: any } = { owner: user_id };
            if (filter) {
                query.completed = filter;
            }

            const totalCount = await TaskModel.countDocuments(query);
            const totalPages = Math.ceil(totalCount / limit);

            const tasks = await TaskModel.find(query).skip(skip).limit(limit);

            return successResponse(res, 200, "Success", {
                tasks,
                totalPages,
                currentPage: page,
                totalCount
            });
        } catch (error) {
            console.error('Error fetching tasks:', error);
            return failedResponse(res, 500);
        }
    }

      static async getTaskById(req: Request, res: Response) {
        try {

            const task =  await TaskModel.findOne({owner:(req as any).user._id, _id:req.params.id});
            if (!task) return failedResponse(res, 404, "Task not found.");
            return successResponse(res, 200, "Success", task)

        } catch (error) {
            writeErrosToLogs(error)
            return failedResponse(res, 500);
        }
      };

      static async updateTaskById(req: Request, res: Response) {
        try {

            // Validate request body against schema
            const { error, value } = updateTaskJoiSchema.validate(req.body);
            if (error) {
                return failedResponse(res, 400, `${error.details[0].message}`)

            }
            const task =  await TaskModel.findOneAndUpdate({owner:(req as any).user._id, _id:req.params.id}, value, {new:true});
            if (!task) return failedResponse(res, 404, "Task not found.");
            return successResponse(res, 200, "Success", task)

        } catch (error) {
            writeErrosToLogs(error)
            return failedResponse(res, 500);
        }
      };

      static async deleteTaskById(req: Request, res: Response) {
        try {

            const task =  await TaskModel.findOneAndDelete({owner:(req as any).user._id, _id:req.params.id});
            if (!task) return failedResponse(res, 404, "Task not found.");
            return successResponse(res, 204, "Success", task)

        } catch (error) {
            writeErrosToLogs(error)
            return failedResponse(res, 500);
        }
      };
    

};