const express = require("express")
const app = express()
const cors = require("cors")
// CONFIGS
app.use(express.json())
app.use(cors())

// ROUTES
const routeContainer = require("./routes/container")
const routeMovements = require("./routes/movements")

app.use("/conteiner", routeContainer)
app.use("/movimentacao", routeMovements)

// OTHER CONFIGS
const PORT = 8080
app.listen(PORT, ()=> {
    console.log(`SERVIDOR INICIADO NA PORTA ${PORT}`)
})