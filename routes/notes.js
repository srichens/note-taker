const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');

notes.get('/', (req, res) =>{
  console.info(`${req.method} request received to view notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));   
});

notes.post('/', (req, res) =>{
  console.info(`${req.method} request received to add a note`); 
    
  const { title, text } = req.body;

  if(title && text){
    const newNote = {
      title,
      text,
      id: uuid(),
    }

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

notes.delete('/:id', (req, res) =>{
  console.info(`${req.method} request received to delete a note`);

  const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
        
  const deleteNoteID = req.params.id;

  if (req.params.id){
    console.log(deleteNoteID);
    readFromFile('./db/db.json')
    .then((data) => {     
      parsedNotes = JSON.parse(data);
      const index = parsedNotes.findIndex(item => item.id === deleteNoteID);
      const deletedNote = parsedNotes.splice(index, 1);
      console.log(deletedNote);
      console.log(parsedNotes);
      writeToFile('./db/db.json', parsedNotes);

    }); 
  }
  readFromFile('./db/db.json')
  .then((data) => res.json(JSON.parse(data))
  ); 
 });

module.exports = notes;