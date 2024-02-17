const fs = require('node:fs/promises');

async function getData() {
	const rawFileContent = await fs.readFile('data.json', { encoding: 'utf-8' });
	const data = JSON.parse(rawFileContent);

	return data;
}

async function getStoredComments() {
	const data = await getData();
	const storedComments = data.comments ?? [];

	storedComments.sort((a, b) => b.score - a.score);

	return storedComments;
};

async function storeComment(comment) {
	const data = await getData();
	const existingComments = data.comments;
	const updatedComments = [...existingComments, comment]

	return fs.writeFile('data.json', JSON.stringify({ currentUser: data.currentUser, comments: updatedComments || [] }))
};

async function deleteComment(body) {
	const data = await getData();
	const comments = data.comments;
	const newComments = [];

	for (let i = 0; i < comments.length; i++) {
		if (comments[i].id !== body.id) {
			newComments.push(comments[i]);
		}
	};

	return fs.writeFile('data.json', JSON.stringify({ currentUser: data.currentUser, comments: newComments }))
}

async function updateComment(comment) {
	const data = await getData();
	const comments = data.comments;
	const newComments = [];

	for (let i = 0; i < comments.length; i++) {
		if (comments[i].id === comment.id) {
			newComments.push(comment);
		} else {
			newComments.push(comments[i])
		}
	}

	return fs.writeFile('data.json', JSON.stringify({ currentUser: data.currentUser, comments: newComments }));
}

exports.getStoredComments = getStoredComments;
exports.storeComment = storeComment;
exports.deleteComment = deleteComment;
exports.updateComment = updateComment;