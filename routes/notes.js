const express = require('express');
const notesRoute = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require ('../db/db.json');

// router.put('/notes') etc.


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
          (writeE) =>
            writeE
              ? console.error(writeE)
              : console.info('Note added successfully!')
        );
      }
    });
  }
  res.json(parseData)
});

notesRoute.delete('/:id', (req, res) => {
  const id = req.params
  for (let i = 0; i < db.length; i++) {
    const note = db[i];
    console.info(note)
    const { title, text, noteId } = note
    if (id === noteId) {
      fs.readFile('./db/db.json', 'utf8', (e, d) => {
        const parsedData = JSON.parse(d);
        const sliced = parsedData.slice(note);
      })
    }
  }
});


module.exports = notesRoute;