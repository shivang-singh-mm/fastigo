import { Server } from "socket.io";

let io: Server;

export const initializeSocket = (
    socketServer: Server
) => {
    io = socketServer;
};

export const getIO = () => io;