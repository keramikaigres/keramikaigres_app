let express = require('express');
let router = express.Router();

let pool = require('../database');

router.get('/add', (req,res) => {
    res.send('form');
})

module.exports = router;