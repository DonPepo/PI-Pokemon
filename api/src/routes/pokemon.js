const express = require('express');
const router = express.Router();
const { axios } = require('axios');
const { getAllPokemon, getSomePokemon, getOnePokemon, createPokemon } = require('./controllers/pokemon.controller');



router.get("/pokemon/all", getAllPokemon)


router.get("/pokemon", getSomePokemon)


router.get("/pokemon/:idPokemon", getOnePokemon)


router.get("/pokemon?name=", getOnePokemon)


router.post("/pokemon", createPokemon)


module.exports = router