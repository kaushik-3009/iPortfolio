const express = require('express');
const path = require('path');

// const router = ;
const app = express();
const PORT = 5000;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT);
console.log('Server started at http://localhost:' + PORT);
// app.use('/', require('./routes/admin-panel/routes.js'));
