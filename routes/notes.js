const express = require('express');
const notesRoute = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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
      note_id: uuidv4(),
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
  location.reload()
});



module.exports = notesRoute;