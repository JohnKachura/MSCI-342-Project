let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const res = require('express/lib/response');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM movies`;
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		console.log(results);
		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getActors', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * from actors
	WHERE image_link IS NOT NULL;
	`;
	console.log(sql);
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		console.log(results);
		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addReview', (req, res) => {
	let connection = mysql.createConnection(config);

	let movieID = req.body.movieID;
	let userID = '1';
	let title = req.body.title;
	let review = req.body.review;
	let rating = req.body.rating;

	let insertReview = 'INSERT INTO Review (userID, movie_id, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)';
	console.log(insertReview);
	let reviewData = [userID, movieID, title, review, rating];
	console.log(reviewData);

	connection.query(insertReview, reviewData, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		} 
			let string = JSON.stringify(results);
			res.send({ express: string});
	});
	connection.end();
});

app.post('/api/searchMovies', (req, res) => {
	let connection = mysql.createConnection(config);

	let movieTitle = req.body.title+"%";
	let actorName = req.body.actorName;
	let directorName = req.body.directorName;

	console.log(movieTitle);
	console.log(actorName);
	console.log(directorName);

	const actorArr = actorName.split(" ");
	let actorFirst = actorArr[0]+"%";

	let actorLast = actorArr[1]+"%"
	if(actorName.length === 0){
		actorLast = "%";
	}
	
	const directorArr = directorName.split(" ");
	let directorFirst = directorArr[0]+"%";

	let directorLast = directorArr[1]+"%"
	if(directorName.length === 0){
		directorLast = "%";
	}


	let sql = `SELECT m.name,d.first_name,d.last_name,GROUP_CONCAT(rev.reviewContent SEPARATOR '    |    ') as review,avgScore FROM Review rev
	LEFT OUTER JOIN movies m ON rev.movie_id = m.id
	LEFT OUTER JOIN movies_directors md ON rev.movie_id = md.movie_id
	LEFT OUTER JOIN directors d ON md.director_id = d.id
	LEFT OUTER JOIN (
		SELECT movie_id, avg(reviewScore) as avgScore FROM Review
		GROUP BY movie_id
		) sc ON rev.movie_id = sc.movie_id
	WHERE m.name LIKE ?
	AND d.first_name LIKE ?
	AND d.last_name LIKE ?
	AND m.id IN(
	SELECT movie_id FROM movies m
	RIGHT OUTER JOIN roles r ON m.id = r.movie_id
	LEFT OUTER JOIN actors a ON r.actor_id = a.id
	WHERE a.first_name LIKE ?
	AND a.last_name LIKE ?
	)
	GROUP BY m.name, d.first_name, d.last_name, avgScore;`;

	let data = [movieTitle, directorFirst, directorLast, actorFirst, actorLast];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		} 
			let string = JSON.stringify(results);
			console.log(string);
			res.send({ express: string});
	});
	connection.end();
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
