const pool = require('../config/auth')
const Pokemon = require('./pokemon')

class Model {
    static showAllPokemons(cb) {
        const query = `SELECT * FROM "Pokemons"`
        pool.query(query, (err, res) => {
            if (err) {
                cb(err, null)
            } else {
                const result = res.rows.map( element => {
                    return new Pokemon(element) // Convert to Instance
                })
                cb(null, result)
            }
        })
    }

    static addPokemonToDB(data, cb) {
        const validation = Model.pokemonFormValidation(data)
        if (validation) {
            cb(null, validation)
        } else {
            const query = `INSERT INTO "Pokemons" ("name", "HP", "isFat") VALUES ($1, $2, $3)`
            const values = [data.name, data.HP, data.isFat]
            pool.query(query, values, (err, res) => {
                if (err) {
                    cb(err, null)
                } else {
                    cb(null, null)
                }
            })
        }
    }

    static pokemonFormValidation(data) {
        const result = []
        
        if (!data.name) result.push('Name is Required')
        if (!data.HP) result.push('HP is Required')
        if (!data.isFat) result.push('isFat is Required')

        return result.join(', ')
    }

    static editPokemon(id, cb) {
        const query = `SELECT * FROM "Pokemons" WHERE "id" = ${id}`
        pool.query(query, (err, res) => {
            if (err) {
                cb(err, null)
            } else {
                cb(null, new Pokemon(res.rows[0]))
            }
        })
    }

    static editPokemonToDB(data, id, cb) {
        const validation = Model.pokemonFormValidation(data)
        if (validation) {
            cb(null, validation)
        } else {
            const query = `UPDATE "Pokemons" SET "name" = $1, "HP" = $2, "isFat" = $3 WHERE "id" = $4`
            const values = [data.name, data.HP, data.isFat, +id]
            pool.query(query, values, (err, res) => {
                if (err) {
                    cb(err, null)
                } else {
                    cb(null, null)
                }
            })
        }
    }

    static deletePokemonFromDB(id, cb) {
        const query = `DELETE FROM "Pokemons" WHERE "id" = ${id}`
        pool.query(query, (err, res) => {
            if (err) {
                cb(err, null)
            } else {
                cb(null, null)
            }
        })
    }
}

module.exports = Model