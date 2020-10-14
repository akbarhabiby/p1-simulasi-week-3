const Model = require('../models/model')

class Controller {
    static redirectToHome(req, res) {
        res.redirect('/')
    }

    static getAllPokemons(req, res) {
        Model.showAllPokemons( (err, data) => {
            if (err) {
                res.render('404', { err })
            } else {
                res.render('pokemon', { data })
            }
        })
    }

    static getAddPokemonForm(req, res) {
        res.render('pokemonAdd', { error: req.query.error })
    }

    static postAddPokemonForm(req, res) {
        Model.addPokemonToDB(req.body, (err, validation) => {
            if(err) {
                res.render('404', { err })
            } else if (validation) {
                res.redirect('/pokemons/add?error='+validation)
            } else {
                res.redirect('/') // Jika tidak ada yang error
            }
        })
    }

    static getEditPokemonForm(req, res) {
        Model.editPokemon(+req.params.id, (err, data) => {
            if (err) {
                res.render('404', { err })
            } else {
                res.render('pokemonEdit', { data, error: req.query.error })
            }
        })
    }

    static postEditPokemonForm(req, res) {
        Model.editPokemonToDB(req.body, req.params.id, (err, validation) => {
            if (err) {
                res.render('404', { err })
            } else if (validation) {
                res.redirect('/pokemons/edit/'+req.params.id+'?error='+validation)
            } else {
                res.redirect('/')
            }
        })
    }

    static getDeletePokemonById(req, res) {
        Model.deletePokemonFromDB(+req.params.id, err => {
            if(err) {
                res.render('404', { err })
            } else {
                res.redirect('/')
            }
        })
    }
}

module.exports = Controller