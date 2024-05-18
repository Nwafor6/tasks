// socket.ts
import { Server } from "socket.io";
import { io } from ".";
import { authenticate } from "./socket/authentication"; 
import { logger } from "./logger";

export const EVENTS = {
  connection: "connection",
  CLIENT: {
    RECIEVE_TASK: "RECIEVE_TASK",
  },
  SERVER: {
    ERROR: "ERROR",
    SEND_TASK:"SEND_TASK"
  },
};

/**
 * Configures socket.io to handle connections and authentication.
 */
export function socket() {
  // Use the authenticate middleware to authenticate socket connections
  io.use(authenticate);
  
  // Handle socket connections
  io.on(EVENTS.connection, (socket) => {
      // Add the user to their personal group based on their user ID
      socket.join(socket.user._id);
      
      // Log user information
      logger.info(socket.user);

      // Handle disconnection
      socket.on("disconnect", () => {
          logger.info(`Client disconnected: ${socket.id}`);
      });
  });
}
