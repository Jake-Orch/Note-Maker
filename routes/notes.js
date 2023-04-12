const express = require('express');
const notesRoute = express.Router();
const fs = require('fs');

// router.put('/notes') etc.


notesRoute.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.info(`${req.body}`);
    const { title, text } = req.body;
    console.info(`${title} ${text}`)
    if (title && text) {
      console.info(`req.body working`)
        const newNote = {
            title,
            text
            // ADD ID MAKER           note_id: uuid()
        };
  
        fs.readFile('./db/db.json', 'utf8', (e, d) => {
          console.info('Begun readingFile')
            if (e) {
                console.error(e);
            } else {
                const parsedData = JSON.parse(d);
  
                parsedData.push(newNote);
  
                console.log('so far so good')
                fs.writeFile('./db/db.json', 
                JSON.stringify(parsedData),
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