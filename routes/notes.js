const express = require('express');
const notesRoute = express.Router();
const fs = require('fs');
const { uuid } = require('uuidv4');

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
  console.info(`${req.body}`);
  const { title, text } = req.body;
  console.info(`${title} ${text}`)
  if (title && text) {
    const newNote = {
      title,
      text
      // ADD ID MARKER           note_id: uuid()
    };
    fs.readFile('./db/db.json', 'utf8', (e, d) => {
      if (e) {
        console.error(e);
      } else {
        const parsedData = JSON.parse(d);

        parsedData.push(newNote);

        console.log('so far so good')
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
});



module.exports = notesRoute;