const express = require('express');
const router = express.Router();
const { getTypes } = require('./controllers/pokemon.controller')


router.get("/types", getTypes)


module.exports = router