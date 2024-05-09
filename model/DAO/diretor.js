/***********************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação de dados no Banco de Dados MySQL,
* aqui realizamos o CRUD (Create, Read, Update, Delete) utilizando a linguagem SQL.
* Data: 01/02/2024
* Autor: Kelvinn Camargo
* Versão: 1.0
***********************************************************************************************************/

//Import da biblioteca do prisma client
const { PrismaClient} = require('@prisma/client')

//Instância da classe prisma client
const prisma = new PrismaClient()

const inserirDiretor = async function(dadosDiretor) {

    let sql
    try {

        if( dadosDiretor.data_falescimento != ''      &&
            dadosDiretor.data_falescimento != null    &&
            dadosDiretor.data_falescimento != undefined
        ){

            sql = `insert into tbl_ator (   nome,
                                            data_nascimento,
                                            data_falescimento,
                                            biografia,
                                            foto,
                                            id_sexo
            ) values (
                                            '${dadosDiretor.nome}',
                                            '${dadosDiretor.data_nascimento}',
                                            '${dadosDiretor.data_falescimento}',
                                            '${dadosDiretor.biografia}',
                                            '${dadosDiretor.foto}',
                                            '${dadosDiretor.id_sexo}'
            )`

        } else {
            sql = `insert into tbl_ator (  nome,
                                           data_nascimento,
                                           data_falescimento,
                                           biografia,
                                           foto,
                                           id_sexo
            ) values (
                                            '${dadosDiretor.nome}',
                                            '${dadosDiretor.data_nascimento}',
                                            null,
                                            '${dadosDiretor.biografia}',
                                            '${dadosDiretor.foto}',
                                            '${dadosDiretor.id_sexo}'

            )`
        }

        //$executeRawUnsafe() - serve para executar scripts sem retorno de dados
        //(insert, update e delete)
        //$queryRawUnsafe() - serve para executar scripts com retorno de dados (select)
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Função para buscar um filmes do Banco de Dados pelo ID
const selectByIdDiretor = async function(id) {

    try {

        //ScriptSQL para buscar um filme pelo ID
        let sql = `select * from tbl_diretor where id=${id}`

        //Encaminha o script SQL para o Banco de Dados
        let rsDiretor = await prisma.$queryRawUnsafe(sql)

        return rsDiretor

    } catch (error) {

        return false
    }
        
}

//Função para excluir um filme no Banco de Dados
const deleteDiretor = async function(id) {

    try {
        const sql = `delete from tbl_diretor where id = ${id}`
        let rsDiretor = await prisma.$executeRawUnsafe(sql)
        return rsDiretor
    } catch (error) {
        return false
    }

}

//Função para listar todos os filmes do Banco de Dados
const selectAllDiretor = async function() {

    let sql = 'select * from tbl_diretor'

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme')
    let rsDiretores = await prisma.$queryRawUnsafe(sql)

    if(rsDiretores.length > 0)
        return rsDiretores
    else
        return false
}

module.exports = {
    inserirDiretor,
    selectByIdDiretor,
    deleteDiretor,
    selectAllDiretor

}