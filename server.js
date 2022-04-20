const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const allNotes = require('./db/db.json');
// makes the server able to accept a "what port to listen on" parameter from the environment
const PORT = process.env.PORT || 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Adding a static route for index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get('/api/notes', (req, res) => {
  res.json(allNotes.slice(1));
});







app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);