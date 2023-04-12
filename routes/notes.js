const express = require('express');
const notesRoute = express.Router();
const fs = require('fs');

// router.put('/notes') etc.


notesRoute.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.info(`${req.body}`);
    const { noteTitle, noteBody } = req.body;
    console.info(`${noteTitle} ${noteBody}`)
    if (noteTitle && noteBody) {
      console.info(`req.body working`)
        const newNote = {
            title,
            note
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

  // notesRoute.post('/', (req, res) => {
  //   console.info(`${req.method} request received to add a note`);
  
  //   const { title, note } = req.body;
  
  //   // If all the required properties are present
  //   if (title, note) {
  //     // Variable for the object we will save
  //     const newNote = {
  //       title,
  //       note
  //       // ADD id 
  //     };
  
  //     // Obtain existing reviews
  //     fs.readFile('./db/db.json', 'utf8', (err, data) => {
  //       if (err) {
  //         console.error(err);
  //       } else {
  //         const parsedNotes = JSON.parse(data);
  
  //         // Add a new review
  //         parsedNotes.push(newNote);
  
  //         // Write updated reviews back to the file
  //         fs.writeFile(
  //           './db/reviews.json',
  //           JSON.stringify(parsedNotes, null, 4),
  //           (writeErr) =>
  //             writeErr
  //               ? console.error(writeErr)
  //               : console.info('Successfully updated reviews!')
  //         );
  //       }
  //     });
  
  //     const response = {
  //       status: 'success',
  //       body: newNote,
  //     };
  
  //     console.log(response);
  //     res.status(201).json(response);
  //   } else {
  //     res.status(500).json('Error in posting review');
  //   }
  // });
  

module.exports = notesRoute;