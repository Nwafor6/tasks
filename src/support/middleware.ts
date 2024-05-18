import { logger } from "../logger";
import { NextFunction, Request, Response } from "express";
import { failedResponse } from "./http";
import { verifyJwtToken } from "./generateTokens";
import { writeErrosToLogs } from "./helpers";



export const IsAuthenticatedUser =async (req:Request, res:Response, next:NextFunction) =>{

    if (!req.headers.authorization) {
        return failedResponse(res, 401, 'Access denied. Authorization header missing.');
    }
    const token =req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token){
        return failedResponse (res, 401, 'Access denied. No token provided.' )
    }
    try {
            const decodedToken = verifyJwtToken(token);

            (req as any).user = decodedToken
            next();
    } catch (error:any) {
            writeErrosToLogs(error)
            return failedResponse (res, 401, 'Invalid access token.' )
    }
}


