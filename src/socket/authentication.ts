import { verifyJwtToken } from "../support/generateTokens";
import { logger } from "../logger";
import { NextFunction } from "express";

/**
 * Authenticates a socket connection by verifying the access token provided in the handshake headers.
 *
 * @param {Object} socket - The socket object representing the connection.
 * @param {Function} next - The callback function to proceed to the next middleware.
 */
export function authenticate(socket:any, next:any) {
    // Extract the access token from the handshake headers
    const access_token = socket.handshake.headers.access_token;
    
    // If access token is not provided, log an info message and call the next middleware with an authentication error
    if (!access_token) {
        logger.info("Access token not provided.");
        return next(new Error("Authentication error"));
    }

    try {
        // Verify the JWT token
        const decoded = verifyJwtToken(access_token);
        
        // Attach the decoded user information to the socket object
        socket.user = decoded;

        // Call the next middleware
        next();
    } catch (error) {
        // If verification fails, call the next middleware with an authentication error
        next(new Error("Authentication error"));
    }
}
