const router = require('express').Router()
const Controller = require('../controllers/controller')

// Home
router.get('/', Controller.redirectToHome) // Fix Cannot GET /pokemons

// Add
router.get('/add', Controller.getAddPokemonForm) // GET /pokemons/add
router.post('/add', Controller.postAddPokemonForm) // POST /pokemons/add

// Edit
router.get('/edit/:id', Controller.getEditPokemonForm) // GET /pokemons/delete/:id
router.post('/edit/:id', Controller.postEditPokemonForm) // GET /pokemons/delete/:id

// Delete
router.get('/delete/:id', Controller.getDeletePokemonById) // GET /pokemons/delete/:id

module.exports = router