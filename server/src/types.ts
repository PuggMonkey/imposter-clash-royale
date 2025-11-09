/**
 * Player data structure
 */
type Player = {
	id: string;
	name: string;
	socketId: string;
};

/**
 * Room data states
 */
type RoomState = 'lobby' | 'playing' | 'voting' | 'reveal';

/**
 * Room data structure
 */
type Room = {
	code: string;
	hostId: string | null;
	players: Player[];
	state: RoomState;

	// game-specific
	imposterId?: string;
	card?: string;
	votes: Record<string, string>; // voterId -> targetId
};
