const express = require("express");
const bodyParser = require("body-parser");

const { getCurrentUser } = require("./data/currentUser");
const { getStoredComments, storeComment } = require("./data/comments")

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
});

app.get("/currentUser", async (req, res) => {
	const currentUser = await getCurrentUser();
	res.json({ currentUser: currentUser });
});

app.get("/comments", async (req, res) => {
	const storedComments = await getStoredComments();

	res.json({ comments: storedComments });
})

app.post("/comments", async (req, res) => {
	const comment = req.body;
	
	await storeComment(comment);
	res.status(200).json({ message: "Stored new comment.", comment: comment });
})

app.listen(8080);