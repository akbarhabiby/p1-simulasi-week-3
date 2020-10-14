const pool = require('./config/auth')

const query = `CREATE TABLE "Pokemons" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(25) NOT NULL,
    "HP" INTEGER NOT NULL,
    "isFat" BOOLEAN NOT NULL
)`

pool.query(query, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Success CREATE TABLE "Pokemons"`);
        pool.end()
    }
})