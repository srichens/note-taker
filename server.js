const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');

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


app.post('/api/notes', (req, res) =>{
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;


  if(title && text){
    const newNote = {
      title,
      text
    }

    const response = {
      status: 'success',
      body: newNote,
    };

    const noteString = JSON.stringify(newNote);

    fs.appendFile(`./db/db.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `New npte titled ${newNote.title} has been written to JSON file`
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
