import { Router } from "express";
import { Task } from "../controllers/task";
import { IsAuthenticatedUser } from "../support/middleware";

export const taskRoute = Router();

taskRoute
.post("/add-task",IsAuthenticatedUser, Task.addTask)
.get("/get-tasks", IsAuthenticatedUser,Task.getTasks)
.get("/get-task/:id", IsAuthenticatedUser, Task.getTaskById)
.put("/update-task/:id", IsAuthenticatedUser, Task.updateTaskById)
.delete("/delete-task/:id", IsAuthenticatedUser, Task.deleteTaskById);
