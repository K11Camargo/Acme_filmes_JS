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

const inserirAtor = async function(dadosAtor) {

    let sql
    try {

        if( dadosAtor.data_falescimento != ''      &&
            dadosAtor.data_falescimento != null    &&
            dadosAtor.data_falescimento != undefined
        ){

            sql = `insert into tbl_ator (   nome,
                                            nome_artistico,
                                            data_nascimento,
                                            data_falescimento,
                                            biografia,
                                            foto,
                                            id_sexo
            ) values (
                                            '${dadosAtor.nome}',
                                            '${dadosAtor.nome_artistico}',
                                            '${dadosAtor.data_nascimento}',
                                            '${dadosAtor.data_falescimento}',
                                            '${dadosAtor.biografia}',
                                            '${dadosAtor.foto}',
                                            '${dadosAtor.id_sexo}'
            )`

        } else {
            sql = `insert into tbl_ator (  nome,
                                           nome_artistico,
                                           data_nascimento,
                                           data_falescimento,
                                           biografia,
                                           foto,
                                           id_sexo
            ) values (
                                            '${dadosAtor.nome}',
                                            '${dadosAtor.nome_artistico}',
                                            '${dadosAtor.data_nascimento}',
                                            null,
                                            '${dadosAtor.biografia}',
                                            '${dadosAtor.foto}',
                                            '${dadosAtor.id_sexo}'

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
const selectByIdAtor = async function(id) {

    try {

        //ScriptSQL para buscar um filme pelo ID
        let sql = `select * from tbl_ator where id=${id}`

        //Encaminha o script SQL para o Banco de Dados
        let rsAtor = await prisma.$queryRawUnsafe(sql)

        return rsAtor

    } catch (error) {

        return false
    }
        
}

//Função para excluir um filme no Banco de Dados
const deleteAtor = async function(id) {

    try {
        const sql = `delete from tbl_ator where id = ${id}`
        let rsFilme = await prisma.$executeRawUnsafe(sql)
        return rsFilme
    } catch (error) {
        return false
    }

}

//Função para listar todos os filmes do Banco de Dados
const selectAllAtores = async function() {

    let sql = 'select * from tbl_ator'

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme')
    let rsAtores = await prisma.$queryRawUnsafe(sql)

    if(rsAtores.length > 0)
        return rsAtores
    else
        return false
}

module.exports = {
    inserirAtor,
    selectByIdAtor,
    deleteAtor,
    selectAllAtores

}