const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRouter = require('./pokemon');
const typeRouter = require('./type');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/api', pokemonRouter);
router.use('/api', typeRouter);
/* router.use('/myPokemon', myPokemonRouter); */


module.exports = router;
