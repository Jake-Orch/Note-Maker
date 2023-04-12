const express = require('express');
const path = require('path');
const api = require('./routes/index');
const notesRoute = require('./routes/notes');
const database = require('./db/db.json')
const fs = require('fs');
// const uuid = require('uuid');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/api', api);


// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'./public/index.html'))
})

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`Serving static asset routes at http://localhost:${PORT}`)
);