const router = require('express').Router()
const pokemonRouter = require('./pokemonRouter')
const Controller = require('../controllers/controller')

router.get('/', Controller.getAllPokemons) // GET /

router.use('/pokemons', pokemonRouter) // GET /pokemons

module.exports = router