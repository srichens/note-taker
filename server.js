const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid');

const PORT = 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>{
  console.info(`${req.method} request received to view notes`);
  res.json(notes)}
);

app.post('/api/notes', (req, res) =>{
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;


  if(title && text){
    const newNote = {
      title,
      text,
      note_id: uuid(),
    }

    const response = {
      status: 'success',
      body: newNote,
    };

    let noteArray = [];
    noteArray.push(newNote);
    console.log(noteArray[0]);

   
   const noteString = JSON.stringify(noteArray);
   console.log(noteString);

   
   
  //  for(let i = 0; i < noteArray.length; i++)
  //  noteArray = noteArray.push
   

    fs.writeFile(`./db/db.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `New note titled ${newNote.title} has been written to JSON file`
          )
    );

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
