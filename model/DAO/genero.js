/***********************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação de dados no Banco de Dados MySQL,
* aqui realizamos o CRUD (Create, Read, Update, Delete) utilizando a linguagem SQL.
* Data: 11/04/2024
* Autor: Kelvinn Camargo
* Versão: 1.0
***********************************************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertGenero =  async function(dadosGenero) {
    
    try {

     let sql = `insert into tbl_genero(nome) values ("${dadosGenero.nome}")`
            
        // Executa o script SQL no banco de dados | Devemos usar execute e não query!
        // Execute deve ser utilizado para insert, update e delete, onde o banco não devolve dados
        let result = await prisma.$executeRawUnsafe(sql);

        // Validação para verificar se o insert funcionou no banco de dados
        if(result )
            return true;
        else
            return false;

    } catch (error) {

        return false;
        
    }
}
const updateGenero = async function (id, dadoAtualizado) {
    let sql

    sql = `update tbl_genero set nome = "${dadoAtualizado.nome}", where id = ${id}`

    console.log(sql)
    let result = await prisma.$executeRawUnsafe(sql)

    if (result) {
        return true
    } else {
        return false
    }

}

const deleteGenero = async function (id) {

    try {
        const sql = `delete from tbl_genero where id = ${id}`
        let rsGenero = await prisma.$executeRawUnsafe(sql)
        return rsGenero
    } catch (error) {
        return false
    }

}




const selectAllGeneros = async function () {

    let sql = 'select * from tbl_genero'

    let rsGeneros = await prisma.$queryRawUnsafe(sql)

    if (rsGeneros.length > 0)
        return rsGeneros
    else
        return false
}

const selectByIdGenero = async function (id) {

    try {

        let sql = `select * from tbl_genero where id=${id}`

        let rsGenero = await prisma.$queryRawUnsafe(sql)

        return rsGenero

    } catch (error) {

        return false
    }

}

const selectNomeGenero = async function (nome) {

    try {

        let sql = `select * from tbl_genero where nome like '%${nome}%'`

        let rsGenero = await prisma.$queryRawUnsafe(sql)

        return rsGenero


    } catch (error) {

        return false
    }

}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    selectByIdGenero,
    selectNomeGenero
}