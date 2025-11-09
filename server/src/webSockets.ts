import { io } from 'server';
import { nanoid } from 'nanoid';

/**
 * Holds all current rooms, mapped by their room code.
 */
const rooms = new Map<string, Room>();

io.on('connection', (socket) => {
	console.log(`New client connected: ${socket.id}`);

	/**
	 * On room creation (user hitting the "create room" button), create a new room and emit a response.
	 */
	socket.on('room_create', (data) => {
		console.log(`Room create requested by ${socket.id} with data:`, data);

		// Check if room code already exists
		if (rooms.has(data.roomCode)) {
			socket.emit('room_create_response', {
				success: false,
				message: 'Room code already exists.',
			});
			return;
		}

		// Create new room
		const newRoom: Room = {
			code: data.roomCode,
			hostId: socket.id,
			players: [],
			state: 'lobby',
			votes: {},
		};
		rooms.set(data.roomCode, newRoom);
	});

	/**
	 * On room join (user hitting the "join room" button), join a room and emit a response.
	 */
	socket.on('room_join', (data) => {
		console.log(`Room join requested by ${socket.id} with data:`, data);

		// Check if room exists
		const room = rooms.get(data.roomCode);
		if (!room) {
			socket.emit('room_join_response', {
				success: false,
				message: 'Room not found.',
			});
			return;
		}

		// Check if room is in progress, if so do not allow join
		if (room.state !== 'lobby') {
			socket.emit('room_join_response', {
				success: false,
				message: 'Cannot join, game already in progress.',
			});
			return;
		}

		// Add player to room
		const newPlayer: Player = {
			id: nanoid(),
			name: data.name,
			socketId: socket.id,
		};

		room.players.push(newPlayer);
		socket.join(data.roomCode);
		socket.emit('room_join_response', {
			success: true,
			message: 'Joined room successfully.',
		});
	});

	/**
	 * On room leave (user hitting the "leave room" button), leave a room and emit a response.
	 */
	socket.on('room_leave', (data) => {
		console.log(`Room leave requested by ${socket.id} with data:`, data);

		// Check if room exists
		const room = rooms.get(data.roomCode);
		if (!room) {
			socket.emit('room_leave_response', {
				success: false,
				message: 'Room not found.',
			});
			return;
		}

		// Check if room is in progress, if so do not allow leave
		if (room.state !== 'lobby') {
			socket.emit('room_leave_response', {
				success: false,
				message: 'Cannot leave, game already in progress.',
			});
			return;
		}

		// Remove player from room
		room.players = room.players.filter(
			(player) => player.socketId !== socket.id
		);

		// If host leaves, assign new host
		if (socket.id === room.hostId) {
			if (room.players.length > 0) {
				room.hostId = room.players[0].socketId;
			} else {
				rooms.delete(data.roomCode);
			}
		}

		// Leave room
		socket.leave(data.roomCode);
		socket.emit('room_leave_response', {
			success: true,
			message: 'Left room successfully.',
		});
	});

	socket.on('disconnect', () => {
		console.log(`Client disconnected: ${socket.id}`);
	});
});
