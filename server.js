const express = require('express');
const path = require('path');
const fs = require('fs');
let notes = require('./db/db.json');
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
  notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  
  res.json(notes)
}
);

app.post('/api/notes', (req, res) =>{
  console.info(`${req.method} request received to add a note`);
  // notes = JSON.parse(fs.readFile(`./db/db.json`, 'utf8'));
  const { title, text } = req.body;


  if(title && text){
    const newNote = {
      title,
      text,
      id: uuid(),
    }

    const response = {
      status: 'success',
      body: newNote,
    };

    notes.push(newNote);    
 
   

  fs.writeFileSync(`./db/db.json`, JSON.stringify(notes), (err) =>
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
