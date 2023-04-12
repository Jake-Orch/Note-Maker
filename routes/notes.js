const express = require('express');
const notesRoute = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
let db = require('../db/db.json');

notesRoute.get('/', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (e, d) => {
    if (e) {
      console.error(e);
    } else {
      const notes = JSON.parse(d)
      return res.json(notes)
    }
  })
});

notesRoute.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    fs.readFile('./db/db.json', 'utf8', (e, d) => {
      if (e) {
        console.error(e);
      } else {
        const parsedData = JSON.parse(d);
        parsedData.push(newNote);
        fs.writeFile('./db/db.json',
          JSON.stringify(parsedData, null, 3),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Note added successfully!')
        );
        res.json(parsedData)
      }
    });
  }
  
});

notesRoute.delete('/:id', (req, res) => {
  const selectedId = req.params.id
  let tempNotes = []
  console.info(selectedId);
  for (let i = 0; i < db.length; i++) {
    const note = db[i];

    if (note.id != selectedId) {
      tempNotes.push(note)
    }
  }
  db = tempNotes
  fs.writeFile('./db/db.json',
    JSON.stringify(db),
    (writeErr) => {
      if (writeErr) throw writeErr;
    }
  );
  res.json(db)
});


module.exports = notesRoute;