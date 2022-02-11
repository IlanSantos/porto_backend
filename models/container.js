const db = require("../database")


const createContainer = (cd_cliente, nm_conteiner, tp_conteiner, ct_conteiner) => {
    const txt_create_container = "INSERT INTO conteiner(cd_cliente, numero, tipo, categoria) VALUES ($1, $2, $3, $4) RETURNING *;"
    const values_create_container = [cd_cliente, nm_conteiner, tp_conteiner, ct_conteiner]
    return db.query(txt_create_container, values_create_container) 
}

const getAllContainers = () => {
    const txt_search_container = `SELECT ct.codigo AS cd_conteiner, ct.numero AS nu_conteiner, ct.categoria AS ct_conteiner, ct.tipo AS tp_conteiner,
    ct.situacao AS st_conteiner, cl.nome AS nm_cliente FROM conteiner ct INNER JOIN cliente cl ON ct.cd_cliente = cl.codigo;`
    return db.query(txt_search_container)
}

const getContainerByCode = (cd_conteiner) => {
    const txt_search_container = `SELECT ct.codigo AS cd_conteiner, ct.numero AS nu_conteiner, ct.categoria AS ct_conteiner, ct.tipo AS tp_conteiner,
    ct.situacao AS st_conteiner, cl.nome AS nm_cliente FROM conteiner ct INNER JOIN cliente cl ON ct.cd_cliente = cl.codigo WHERE ct.codigo = $1;`
    return db.query(txt_search_container, [cd_conteiner])
}

const updateContainer = (cd_conteiner, tp_conteiner, st_conteiner) => {
    const txt_update_container = "UPDATE conteiner SET tipo = $2, situacao = $3 WHERE codigo = $1 RETURNING *    ;"
    const values_update_container = [cd_conteiner, tp_conteiner, st_conteiner]
    return db.query(txt_update_container, values_update_container)
}

const deleteContainer = (cd_conteiner) => {
    return db.query("DELETE FROM conteiner WHERE codigo = $1;", [cd_conteiner])
}

module.exports = {
    createContainer,
    getAllContainers,
    getContainerByCode,
    updateContainer,
    deleteContainer
}
