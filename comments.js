// Create web server and listen for requests
// 
// To run this file, you need to install node.js and express
// npm install node
// npm install express
// 
// Then run the server with the command:
// node comments.js
// 
// The server will listen on port 3000
// You can access the server at http://localhost:3000
// 
// To test the server, you can use a web browser or curl
// curl http://localhost:3000/comments
// curl http://localhost:3000/comments/1
// curl -X POST -d '{"comment": "This is a test"}' -H "Content-Type: application/json" http://localhost:3000/comments
// 
// The server will return a JSON response.
//
// The server will store comments in memory. If you restart the server, the comments will be lost.

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var comments = [];

app.use(bodyParser.json());

app.get('/comments', function(req, res) {
	res.json(comments);
});

app.get('/comments/:id', function(req, res) {
	var id = parseInt(req.params.id);
	if (id < 0 || id >= comments.length) {
		res.status(404).json({error: 'Comment not found'});
	} else {
		res.json(comments[id]);
	}
});

app.post('/comments', function(req, res) {
	var comment = req.body.comment;
	if (!comment) {
		res.status(400).json({error: 'Missing comment'});
	} else {
		comments.push(comment);
		res.status(201).json({message: 'Comment added'});
	}
});

app.listen(3000, function() {
	console.log('Server started');
});



