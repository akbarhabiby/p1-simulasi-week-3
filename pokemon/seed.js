const pool = require('./config/auth')
const fs = require('fs')

fs.readFile('./pokemons.json', { encoding: 'utf-8' }, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        let result = []
        data = JSON.parse(data)
        data.forEach( element => {
            result.push(`('${element.name}', ${element.HP}, '${element.isFat}')`)
        })
        result = result.join(', ')
        // Seed data to DB
        const query = `INSERT INTO "Pokemons" ("name", "HP", "isFat") VALUES ${result}`
        pool.query(query, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Success Seed pokemons.js INTO TABLE "Pokemons"`);
                pool.end()
            }
        })
    }
})