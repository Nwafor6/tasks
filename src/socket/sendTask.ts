// sendMessageHandler.ts
import { io } from "../index";
import { EVENTS } from "../socket"; 

/**
 * Sends a new task to a client via a socket.io connection.
 *
 * @param {Object} message - The message object containing task details.
 * @param {string} message.user_id - The ID of the user to whom the task should be sent.
 */
export function sendNewTaskToClient(message:any) {
    io.to(message.user_id).emit(EVENTS.CLIENT.RECIEVE_TASK, { message });
}
