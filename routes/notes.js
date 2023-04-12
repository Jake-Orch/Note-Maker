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
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Note added successfully!')
        );
      }
    });
  }
  res.json(parsedData)
});

notesRoute.delete('/:id', (req, res) => {
  const selectedId = req.params.id
  console.info(selectedId);
  for (let i = 0; i < db.length; i++) {
    const note = db[i];
    const { title, text, id } = note
   console.info(id);
   console.info(`SELECTED ID ${selectedId}`)
    if (id === selectedId) {
      fs.readFile('./db/db.json', 'utf8', (e, d) => {
        const parsedData = JSON.parse(d);
        const theIndex = parsedData.findIndex(item => item.id === selectedId);
        console.info(theIndex);
        const slice = parsedData.slice(theIndex);
        console.info(parsedData);
        console.info(`Lol` + slice);
        // fs.writeFile('./db/db.json',
        // JSON.stringify(parsedData, null, 3),
        // (writeErr) => 
        // writeErr
        // ? console.error(writeErr)
        // : console.info('Note deleted succesfully!'))
      })
    };
  }
});


module.exports = notesRoute;