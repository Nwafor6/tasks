import dotenv from "dotenv"
import { logger } from "../logger"; 

dotenv.config()


export function writeErrosToLogs(error:any) {
    logger.error(`Error in login at line ${error.name}: ${error.message}\n${error.stack}`);
}

