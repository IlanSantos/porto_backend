const express = require("express")
const Router = express.Router()
const modelMovements = require("../models/movements")
const modelContainer = require("../models/container")
const database = require("../database")

Router.post("/", async (req, res) => {
    if(!req.body.cd_conteiner){
        res.status(404).json({message: "Contêiner não informado!", error: true})
        return
    }
    else if(!req.body.tp_movimentacao){
        res.status(404).json({message: "Tipo de movimentação não informado!", error: true})
        return
    }
    else if(!req.body.dt_inicio){
        res.status(404).json({message: "Data inicial não informada!", error: true})
        return
    }
    else if(!req.body.dt_fim){
        res.status(404).json({message: "Data final não informada!", error: true})
        return
    }
    
    try{
        const search_container = await modelContainer.getContainerByCode(req.body.cd_conteiner)
        if (search_container.rowCount === 0){
            res.status(404).json({message: "Não foi localizado o contêiner!", error: true})
            return
        }
        console.log(req.body)
        const create_movement = await modelMovements.createMovement(req.body.tp_movimentacao, req.body.cd_conteiner, req.body.dt_inicio, req.body.dt_fim)
        res.status(201).json({message: "Sucesso na criação da movimentação!", data: create_movement.rows[0]})
    }catch(error){
        res.status(500).json({message: error.toString(), error: true})
    }
})

Router.get("/", async (req, res) => {
    try{
        if(req.query.codigo){
            const search_movements = await modelMovements.getMovementByCode(req.query.codigo)
            res.status(200).json({message: "Sucesso na busca!", data: search_movements.rows})
        }else{
            const search_movements = await modelMovements.getAllMovements()
            res.status(200).json({message: "Sucesso na busca!", data: search_movements.rows})
        }
    }catch(error){
        res.status(500).json({message: error.toString(), error: true})
    }
})

Router.get("/relatorio", async (req, res) => {
    try{
        const get_report = await modelMovements.getReport()
        const total_imports_and_exports = await database.query(`
            SELECT (SELECT COUNT(*) FROM conteiner WHERE categoria = 'E') AS qt_importacao,
            (SELECT COUNT(*) FROM conteiner WHERE categoria = 'I') AS qt_exportacao;
        `)
        res.status(200).json({message: "Busca realizada com sucesso", data: get_report.rows,
        qt_importacao: total_imports_and_exports.rows[0].qt_importacao,
        qt_exportacao: total_imports_and_exports.rows[0].qt_exportacao
    })
    }catch(error){
        res.status(500).json({message: error.toString(), error: true})
    }
})

Router.put("/", async (req, res) => {
    if(!req.body.cd_movimentacao){
        res.status(404).json({message: "Código de movimentação não informado!", error: true})
        return
    }
    else if(!req.body.tp_movimentacao){
        res.status(404).json({message: "Tipo de movimentação não informado!", error: true})
        return
    }
    else if(!req.body.dt_inicio){
        res.status(404).json({message: "Data inicial não informada!", error: true})
        return
    }
    else if(!req.body.dt_fim){
        res.status(404).json({message: "Data final não informada!", error: true})
        return
    }
    try{
        const search_movement = await modelMovements.getMovementByCode(req.body.cd_movimentacao)
        if (search_movement.rowCount === 0){
            res.status(404).json({message: "Não foi localizado a movimentação!", error: true})
            return
        }
        const movement = search_movement.rows[0]
        const update_movement = await modelMovements.updateMovement(req.body.cd_movimentacao || movement.cd_movimentacao,
            req.body.tp_movimentacao || movement.tp_movimentacao,
            req.body.dt_inicio || movement.dt_inicio,
            req.body.dt_fim || movement.dt_fim    
        )
        res.status(201).json({message: "Sucesso na atualização da movimentação!", data: update_movement.rows[0]})

    }catch(error){
        res.status(500).json({message: error.toString(), error: true})
    }
})

Router.delete("/", async (req, res) => {
    if(!req.body.cd_movimentacao){
        res.status(404).json({message: "Código de movimentação não informado!", error: true})
        return
    }
    try{
        const search_movement = await modelMovements.getMovementByCode(req.body.cd_movimentacao)
        if (search_movement.rowCount === 0){
            res.status(404).json({message: "Não foi localizado a movimentação!", error: true})
            return
        }
        await modelMovements.deleteMovement(req.body.cd_movimentacao)
        res.status(201).json({message : "Sucesso ao deletar movimentação!"})
    }catch(error){
        res.status(500).json({message: error.toString(), error: true})
    }
})

module.exports = Router