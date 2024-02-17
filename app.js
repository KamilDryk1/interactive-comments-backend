const express = require("express")
const bodyParser = require("body-parser")

const { getCurrentUser } = require("./data/currentUser")
const { getStoredComments, storeComment, deleteComment, updateComment } = require("./data/comments")

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
})

app.get("/currentUser", async (req, res) => {
	const currentUser = await getCurrentUser();
	res.json({ currentUser: currentUser });
})

app.get("/comments", async (req, res) => {
	const storedComments = await getStoredComments();

	res.json({ comments: storedComments });
})

app.post("/comments", async (req, res) => {
	const comment = req.body;
	
	await storeComment(comment);
	res.status(200).json({ message: "Stored new comment.", comment: comment });
})

app.post("/deleteComment", async (req, res) => {
	const body = req.body;
	const currentUser = await getCurrentUser();

	if (body.user.username === currentUser.username) {
		await deleteComment(body);
		res.status(200).json({ message: "Deleted comment successfully."})
	} else {
		res.status(403).json({ message: "You don't have permission to delete this comment." })
	}
})

app.post("/updateComment", async (req, res) => {
	const comment = req.body;
	const currentUser = await getCurrentUser();

	if (comment.user.username === currentUser.username) {
		await updateComment(comment);
		res.status(200).json({ message: "Updated comment successfully."})
	} else {
		res.status(403).json({ message: "You don't have permission to update this comment." })
	}
})

app.listen(8080);