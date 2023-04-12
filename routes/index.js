const express = require('express');
const router = express.Router();
const notesRoute = require('./notes');
const app = express();


router.use('/notes', notesRoute);


module.exports = router;