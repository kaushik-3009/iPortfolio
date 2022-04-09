const express = require('express');
const path = require('path');

// const router = ;
const app = express();
const PORT = 5000;

//ejs templating
app.set('view engine', 'ejs');
app.use(express.static('./public/'));
app.use('/', require('./routes/routes.js'));

app.listen(PORT);
console.log('Server started at http://localhost:' + PORT);
// app.use('/', require('./routes/admin-panel/routes.js'));
