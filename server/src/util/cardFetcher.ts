/**
 * Temp data for prototyping
 */
const CLASH_CARDS = [
	'Knight',
	'Archers',
	'Giant',
	'Musketeer',
	'Mini P.E.K.K.A',
	'Prince',
	'Skeletons',
	'Baby Dragon',
	'Valkyrie',
	'Hog Rider',
	'Wizard',
	'Goblin Hut',
	'Inferno Tower',
	'Sparky',
	'Lava Hound',
	'Goblin',
	'Ice Spirit',
	'Bandit',
	'Electro Wizard',
	'Golem',
	'Mega Minion',
	'Night Witch',
	'Royal Giant',
	'Miner',
	'Witch',
	'Tesla',
	'Rocket',
	'Balloon',
	'Clone',
	'Freeze',
	'Tombstone',
];

/**
 * Class for fetching cards
 */
class CardFetcher {
	/**
	 * Returns a random card
	 */
	static getRandomCard(): string {
		return this.getAllCards()[Math.floor(Math.random() * CLASH_CARDS.length)];
	}

	/**
	 * Returns all cards
	 */
	static getAllCards(): string[] {
		return CLASH_CARDS;
	}
}
