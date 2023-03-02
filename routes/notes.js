const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

//JSON file is read with the promise function and then the data is returned into a javascript object to be used on the front end
notes.get('/', (req, res) =>{
  console.info(`${req.method} request received to view notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));   
});

//the JSON file is (synchronously) read, parsed as a javascript array, appended with new note, 
//written back into JSON file, parsed as a javascript object again, and sent to the front end
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

//findIndex method ties specified ID to full note after reading and parsing JSON file,
//index allows selected note to be spliced from note array, and the new array is returned,
//written back to the JSON file, read again from the file, parsed as a javascript array and sent 
//as a response to the front end
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