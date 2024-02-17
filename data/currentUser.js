const fs = require('node:fs/promises');

async function getCurrentUser() {
	const rawFileContent = await fs.readFile('data.json', { encoding: 'utf-8' });
	const data = JSON.parse(rawFileContent);
	const currentUser = data.currentUser;

	return currentUser;
};

exports.getCurrentUser = getCurrentUser;