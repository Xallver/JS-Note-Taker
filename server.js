const { v4: uuidv4 } = require('uuid');
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

// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get('/api/notes', (req, res) => {  
  res.json(allNotes.slice(1));
});

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


function generateNewNote(body, notesArray) {
  const newNote = body;
    //creates an empty array when returned false
    if (!Array.isArray(notesArray))
        notesArray = [];
    
    if (notesArray.length === 0)
        notesArray.push(0);
    //creates unique id
    body.id = notesArray[0];
    notesArray[0]++;
    //pushes note
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}
// creates the note
app.post('/api/notes', (req, res) => {
  const newNote = generateNewNote(req.body, allNotes);
  res.json(newNote);
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);