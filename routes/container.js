const express = require("express")
const Router = express.Router()
const modelContainer = require("../models/container")
const hashGenerator = require("../tools/hashGenerator")

Router.post("/", async (req, res) => {
    if(!req.body.cd_cliente){
        res.status(404).json({message: "Cliente não informado!", error: true})
        return
    }
    else if(!req.body.tp_conteiner){
        res.status(404).json({message: "Tipo do contêiner não informado!", error: true})
        return
    }
    else if(!req.body.ct_conteiner){
        res.status(404).json({message: "Categoria não informada!", error: true})
        return
    }
    try{
        const number_container = req.body.ct_conteiner.toUpperCase() === "I" ? 'IMPT' + hashGenerator(1000000, 9999999).toString() : 'EXPT' + hashGenerator(1000000, 9999999).toString()
        const create_container = await modelContainer.createContainer(req.body.cd_cliente, number_container, req.body.tp_conteiner, req.body.ct_conteiner)
        res.status(201).json({message: "Contêiner criado com sucesso!", data: create_container.rows[0]})
    }catch(error){
        res.status(500).json({message: error.toString(), error: true})
    }
})

Router.get("/", async (req, res) => {
    try{
        if(req.query.codigo){
            const search_container = await modelContainer.getContainerByCode(req.query.codigo)
            res.status(200).json({message: "Sucesso na busca!", data: search_container.rows})
        }else{
            const search_container = await modelContainer.getAllContainers()
            res.status(200).json({message: "Sucesso na busca!", data: search_container.rows})
        }
    }catch(error){
        res.status(500).json({message: error.toString(), error: true})
    }
})

Router.put("/", async (req, res) => {
    console.log(req.body)
    if(!req.body.cd_conteiner){
        res.status(404).json({message: "Contêiner não informado!", error: true})
        return
    }
    else if(!req.body.tp_conteiner){
        res.status(404).json({message: "Tipo do contêiner não informado!", error: true})
        return
    }
    else if(!req.body.st_conteiner){
        res.status(404).json({message: "Situação não informada!", error: true})
        return
    }
    try{
        const search_container = await modelContainer.getContainerByCode(req.body.cd_conteiner)
        if (search_container.rowCount === 0){
            res.status(404).json({message: "Não foi localizado o contêiner!", error: true})
            return
        }
        const container = search_container.rows[0]
        const update_container = await modelContainer.updateContainer(req.body.cd_conteiner,
            req.body.tp_conteiner || container.tp_conteiner,
            req.body.st_conteiner || container.st_conteiner    
        )
        res.status(201).json({message: "contêiner atualizado!", data: update_container.rows[0]})
    }catch(error){
        res.status(500).json({message: error.toString(), error: true})
    }
})

Router.delete("/", async (req, res) => {
    if(!req.body.cd_conteiner){
        res.status(404).json({message: "Contêiner não informado!", error: true})
        return
    }
    try{
        const search_container = await modelContainer.getContainerByCode(req.body.cd_conteiner)
        if (search_container.rowCount === 0){
            res.status(404).json({message: "Não foi localizado o contêiner!", error: true})
            return
        }
        await modelContainer.deleteContainer(req.body.cd_conteiner)
    }catch(error){
        res.status(500).json({message: error.toString(), error: true})
    }
})

module.exports = Router