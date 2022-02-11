const db = require("../database")


const createMovement= (tp_movimentacao, cd_conteiner, dt_inicio, dt_fim) => {
    const txt_create_movement = "INSERT INTO movimentacao(tp_movimentacao, cd_conteiner, dt_inicio, dt_fim) VALUES($1, $2, $3, $4) RETURNING *;"
    const values_create_movement = [tp_movimentacao, cd_conteiner, dt_inicio, dt_fim]
    return db.query(txt_create_movement, values_create_movement)
}

const getAllMovements= () => {
    const txt_search_movements = `SELECT mv.codigo AS cd_movimentacao, mv.tp_movimentacao AS tp_movimentacao, mv.dt_inicio, mv.dt_fim, ct.numero AS nu_conteiner FROM movimentacao mv
    INNER JOIN conteiner ct ON mv.cd_conteiner = ct.codigo;
    `
    return db.query(txt_search_movements)
}

const getMovementByCode = (cd_movimentacao) => {
    const txt_search_movements = `SELECT mv.codigo AS cd_movimentacao, mv.tp_movimentacao AS tp_movimentacao, mv.dt_inicio, mv.dt_fim, ct.numero AS nu_conteiner FROM movimentacao mv
    INNER JOIN conteiner ct ON mv.cd_conteiner = ct.codigo WHERE mv.codigo = $1;
    `
    return db.query(txt_search_movements, [cd_movimentacao])
}

const getReport = () =>{
    return db.query(`SELECT cl.nome as nm_cliente, tm.nome as tp_movimentacao, count(*) as qt_movimentacao FROM movimentacao mv 
    INNER JOIN conteiner ct ON mv.cd_conteiner = ct.codigo
    INNER JOIN cliente cl ON ct.cd_cliente = cl.codigo
    INNER JOIN tp_movimentacao tm ON mv.tp_movimentacao = tm.codigo
    GROUP BY cl.nome, tm.nome ORDER BY cl.nome ASC;
    `)
}

const updateMovement = (cd_movimentacao, tp_movimentacao, dt_inicio, dt_fim) => {
    const txt_update_movement = "UPDATE movimentacao SET tp_movimentacao = $1, dt_inicio = $2, dt_fim = $3 WHERE codigo = $4 RETURNING *;"
    const values_update_movement = [tp_movimentacao, dt_inicio, dt_fim, cd_movimentacao]
    return db.query(txt_update_movement, values_update_movement)
}

const deleteMovement = (cd_movimentacao) => {
    return db.query('DELETE FROM movimentacao WHERE codigo = $1;', [cd_movimentacao])
}


module.exports = {
    createMovement,
    getAllMovements,
    getMovementByCode,
    getReport,
    updateMovement,
    deleteMovement
}