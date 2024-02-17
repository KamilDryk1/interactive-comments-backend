const fs = require('node:fs/promises');

async function getData() {
	const rawFileContent = await fs.readFile('data.json', { encoding: 'utf-8' });
	const data = JSON.parse(rawFileContent);

	return data;
}

async function getStoredComments() {
	const data = await getData();
	const storedComments = data.comments ?? [];

	return storedComments;
};

async function storeComment(comment) {
	const data = await getData();
	const existingComments = data.comments;
	const updatedComments = [...existingComments, comment]

	return fs.writeFile('data.json', JSON.stringify({ currentUser: data.currentUser, comments: updatedComments || [] }))
};

exports.getStoredComments = getStoredComments;
exports.storeComment = storeComment;