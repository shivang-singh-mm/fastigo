import 'dotenv/config'
import http from "http";
import { Server } from "socket.io";

import app from "./app";

import {
    initializeSocket
} from "./sockets/socket";

const server =
    http.createServer(app);

const io =
    new Server(server, {
        cors: {
            origin: "*"
        }
    });

initializeSocket(io);

server.listen(5000);
console.log("server Strting")