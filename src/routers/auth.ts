import { Router } from "express";
import { Auth } from "../controllers/auth";

export const authRoute = Router()

authRoute
.post("/sign-up", Auth.registerUser)
.post("/login", Auth.login)