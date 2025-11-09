import express from 'express';
import http from 'http';
import { Server as IOServer } from 'socket.io';

// Express server setup
const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new IOServer(server, {
	cors: { origin: '*' },
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));

export { io };
