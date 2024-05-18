import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { userJoiSchema, userLoginSchema } from '../JoiSchema/user.joi';
import { UserModel } from '../models/task.model';
import { successResponse, failedResponse } from '../support/http';
import { writeErrosToLogs } from '../support/helpers';
import { generateJwtToken } from '../support/generateTokens';
import { logger } from '../logger';

export class Auth {
    static async registerUser(req: Request, res: Response) {
        try {
            // Validate request body against schema
            const { error, value } = userJoiSchema.validate(req.body);
            if (error) {
                return failedResponse(res, 400, `${error.details[0].message}`)

            }
        
            // Check if username already exists
            const existingUsername = await UserModel.findOne({ username: value.username });
            if (existingUsername) {
                logger.info(value.username)
                return failedResponse(res, 400, "Username already exists")
            }

            // Check if username already exists
            const existingEmail = await UserModel.findOne({ email: value.email });
            if (existingEmail) {
                return failedResponse(res, 400, "Email already exists")
            }
        
            // Hash the password
            const salt = await bcrypt.genSalt(10)
            value.password = await bcrypt.hash(value.password, salt);

            // Create new user
            const newUser =  await UserModel.create(value);
            const jwt_token = generateJwtToken({_id:newUser._id, username:newUser.username})
            const data={
                id:newUser._id,
                username:newUser.username,
                fullName:newUser.fullName,
                access_token:jwt_token

            }

            return successResponse(res, 201, "Registeration successful.", data)

        } catch (error) {
            writeErrosToLogs(error)
            return failedResponse(res, 500);
        }
      };

      static async login(req: Request, res: Response) {
        try {
            // Validate request body against schema
            const { error, value } = userLoginSchema.validate(req.body);
            if (error) {
                return failedResponse(res, 400, `${error.details[0].message}`)

            }
        
            // Check if username already exists
            const userExist = await UserModel.findOne({ username: value.username.toLowerCase() }).select("+password");
            if (!userExist) {
                return failedResponse(res, 404, "User does not exist.")
            }
        
            const verifyPassword = await bcrypt.compare(value.password, userExist.password)
        
            if (!verifyPassword){
                return failedResponse(res, 400, "Invalid credentials.")
            }

            const access_token = generateJwtToken({_id:userExist._id, username:userExist.username})

            return successResponse(res, 200, "Success", {access_token})

        } catch (error) {
            writeErrosToLogs(error)
            return failedResponse(res, 500);
        }
      };
      
}