import app from "./app";
import { logger } from "./logger";

// socket.io
import { createServer } from "http";
import { Server } from "socket.io";
import { socket } from "./socket";


const httpServer = createServer(app);

export const io = new Server(httpServer, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

const {PORT } = process.env;

const port = PORT || 8000;

httpServer.listen(PORT, () => {
    logger.info(`server connected on ${port}`);
    socket();
  });