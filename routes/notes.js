const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

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
        
  const deleteNoteID = req.params.id;
 
  readFromFile('./db/db.json')
  .then((data) => {     
    parsedNotes = JSON.parse(data);
    const index = parsedNotes.findIndex(item => item.id === deleteNoteID);
    parsedNotes.splice(index, 1);   
    return parsedNotes;        
  })
  .then((parsedNotes) => writeToFile('./db/db.json', parsedNotes)); 

  readFromFile('./db/db.json')
  .then((data) => res.json(JSON.parse(data))); 
 });

module.exports = notes;