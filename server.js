let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// gets a list of events which are not "friend events" and the user is not a part of for join events page dropdown
app.post('/api/getEvents', (req, res) => {
	let userID = req.body.userID;

	//create connection to sql, declare query in string
	let connection = mysql.createConnection(config);
	let sql = `SELECT eventID, name FROM event WHERE friendEvent = 0 AND eventID NOT IN (SELECT eventID FROM eventUser WHERE userID = ?)`;
	console.log(sql);
	let data = [userID];

	// connecting to sql and using the query variable, turning data into JSON object and sending back as res
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message)
		}

		let string = JSON.stringify(results);

		console.log(string);

		res.send({ express: string });
	});
	connection.end();
});

// API to send users info to mysql to add them to an event
app.post('/api/joinEvent', (req, res) => {
	let userID = req.body.userID;
	let eventID = req.body.eventID;
	console.log("userID: " + userID);
	console.log("eventID: " + eventID);

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO eventUser (userID, eventID) VALUES (?,?)`;
	let data = [userID, eventID];

	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = "Event has been joined!"

		console.log(string);

		res.send({ express: string });
	});
	connection.end();
});

// API to send new events info to add a new event
app.post('/api/addEvent', (req, res) => {
	let eventName = req.body.eventName;
	let eventDate = req.body.eventDate;
	let eventLocation = req.body.eventLocation;
	console.log("Event Name: " + eventName);
	console.log("Event Date: " + eventDate);
	console.log("Event Location" + eventLocation);

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO event (name, date, location, friendEvent) VALUES (?, ?, ?, ?)`;
	let data = [eventName, eventDate, eventLocation, 0];

	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = "Event has been created!"

		console.log(string);

		res.send({ express: string });
	});
	connection.end();
});

// API to send users info to mysql to update profile
app.post('/api/updateProfile', (req, res) => {
	let userID = req.body.userID;
	let profileName = req.body.profileName;
	let profileBio = req.body.profileBio;
	let profileCity = req.body.profileCity;
	let profileHeight = req.body.profileHeight;
	let profileWeight = req.body.profileWeight;
	console.log("made to this side");

	let connection = mysql.createConnection(config);

	let sql = `UPDATE user SET name = ?, city = ?, height = ?, weight = ?, bio = ? WHERE userID = ?`;
	let data = [profileName, profileCity, profileHeight, profileWeight, profileBio, userID];

	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
    
		let string = "Profile updated!"

		console.log(string);

		res.send({ express: string });
	});
	connection.end();
});

//API to send new run info to profile
app.post('/api/addRun', (req, res) => {
	let userID = req.body.userID;
	let nameRun = req.body.nameRun;
	let runDescription = req.body.runDescription;
	let runTime = req.body.runTime;
	let runDistance = req.body.runDistance;
	let runDate = req.body.runDate;
	let eventID = req.body.eventID;
	let runLocation = req.body.runLocation;
	let selectedWeather = req.body.selectedWeather;
	console.log("User ID: " + userID);
	console.log("Run Name: " + nameRun);
	console.log("Run Discription: " + runDescription);
	console.log("Run Time: " + runTime);
	console.log("Run Distance: " + runDistance);
	console.log("Run Date: " + runDate);
	console.log("Run Location: " + runLocation);
	console.log("Run Weather: " + selectedWeather);

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO run (userID, title, description, distance, duration, date, eventID, location, weather) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
	let data = [userID, nameRun, runDescription, runDistance, runTime, runDate, eventID, runLocation, selectedWeather];
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

  		let string = "Run has been created!"

		console.log(string);

		res.send({express: string});
	});
	connection.end();
});

// gets current profile
app.post('/api/getProfile', (req, res) => {
	let userID = req.body.userID;

	//create connection to sql, declare query in string
	let connection = mysql.createConnection(config);
	let sql = `SELECT name , bio, city, height, weight FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];

	// connecting to sql and using the query variable, turning data into JSON object and sending back as res
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message)
		}

		let string = JSON.stringify(results);

		console.log(string);

		res.send({ express: string });
	});
	connection.end();
});


// LANDING PAGE API's: MATT'S CODE

app.post('/api/getEventsLanding', (req, res) => {
	let userID = req.body.userID;

	//create connection to sql, declare query in string
	let connection = mysql.createConnection(config);
	let sql = `SELECT eventID, name
	FROM event
	WHERE friendevent = 0
	AND eventID IN (SELECT eventID FROM eventUser WHERE userID = ?)
	UNION
	SELECT eventID, "All Friends" as name
	FROM event
	WHERE friendevent = 1
	AND userFriends = ?`;
	console.log(sql);
	let data = [userID, userID];

	// connecting to sql and using the query variable, turning data into JSON object and sending back as res
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message)
		}

		let string = JSON.stringify(results);

		console.log(string);
		res.send({express: string});
	});
	connection.end();
});

// Leaderboard
app.post('/api/displayEventLeaderboard', (req, res) => {
	let userID = req.body.userID;
	let eventID = req.body.eventID;

	console.log(userID, eventID)
	console.log(req.body)

	//create connection to sql, declare query in string
	let connection = mysql.createConnection(config);
	let sql = `SELECT u.name, SUM(distance) as total_distance, COUNT(runID) as number_of_runs, MIN(TIME(ROUND((r.duration / r.distance), 2))) as min_pace
	FROM run r
	JOIN user u ON r.userID = u.userID
	WHERE r.eventID = ?
	GROUP BY u.userID`;
	console.log(sql);
	let data = [eventID];

	// connecting to sql and using the query variable, turning data into JSON object and sending back as res
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message)
		}

		let string = JSON.stringify(results);

		console.log(string);

		res.send({express: string});
	});
	connection.end();
});

//RunLog
app.post('/api/displayEventRunLog', (req, res) => {
	let userID = req.body.userID;
	let eventID = req.body.eventID;

	console.log(userID, eventID)
	console.log(req.body)

	//create connection to sql, declare query in string
	let connection = mysql.createConnection(config);
	let sql = `SELECT u.name, r.title, r.description, CAST(r.date AS CHAR) as date, r.distance, r.duration, r.location, r.weather, TIME(ROUND((r.duration / r.distance), 2)) as pace
	FROM run r
	JOIN user u ON r.userID = u.userID
	WHERE r.eventID = ?`;
	console.log(sql);
	let data = [eventID];

	// connecting to sql and using the query variable, turning data into JSON object and sending back as res
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message)
		}

		let string = JSON.stringify(results);

		console.log(string);

		res.send({express: string});
	});
	connection.end();
});

// gets Profile run log
app.post('/api/getRuns', (req, res) => {
	let userID = req.body.userID;

	//create connection to sql, declare query in string
	let connection = mysql.createConnection(config);
	let sql = `SELECT CAST(run.date AS CHAR) as date , run.distance, TIME_FORMAT(CAST(run.duration AS CHAR), '%T') as duration, run.location, run.weather, run.description FROM run WHERE userID = ?`;
	console.log(sql);
	let data = [userID];

	// connecting to sql and using the query variable, turning data into JSON object and sending back as res
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message)
		}

		let string = JSON.stringify(results);

		console.log(string);

		res.send({ express: string });
	});
	connection.end();
});





app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
