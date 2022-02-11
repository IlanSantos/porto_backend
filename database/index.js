const {Pool} = require("pg")

const pool = new Pool({
    host: "localhost",
    port: '5432',
    user: 'postgres',
    password: "123456",
    database: "postgres"
})


module.exports = {
    query: (text, values) => {
        return pool.query(text, values)
    },
    pool: pool
}