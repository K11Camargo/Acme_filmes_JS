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

//Função para inserir um novo filme no Banco de Dados
const insertFilme = async function(dadosFilme) {

    let sql
    try {

        if( dadosFilme.data_relancamento != ''      &&
            dadosFilme.data_relancamento != null    &&
            dadosFilme.data_relancamento != undefined
        ){

            sql = `insert into tbl_filme (  nome,
                                            sinopse,
                                            duracao,
                                            data_lancamento,
                                            data_relancamento,
                                            foto_capa,
                                            valor_unitario,
                                            disponibilidade,
                                            tbl_classificacao_id
            ) values (
                                            '${dadosFilme.nome}',
                                            '${dadosFilme.sinopse}',
                                            '${dadosFilme.duracao}',
                                            '${dadosFilme.data_lancamento}',
                                            '${dadosFilme.data_relancamento}',
                                            '${dadosFilme.foto_capa}',
                                            '${dadosFilme.valor_unitario}',
                                            ${dadosFilme.disponibilidade},
                                            '${dadosFilme.id_classificacao}',
            )`

        } else {
            sql = `insert into tbl_filme (  nome,
                                            sinopse,
                                            duracao,
                                            data_lancamento,
                                            data_relancamento,
                                            foto_capa,
                                            valor_unitario,
                                            disponibilidade,
                                            tbl_classificacao_id

            ) values (
                                            '${dadosFilme.nome}',
                                            '${dadosFilme.sinopse}',
                                            '${dadosFilme.duracao}',
                                            '${dadosFilme.data_lancamento}',
                                            null,
                                            '${dadosFilme.foto_capa}',
                                            '${dadosFilme.valor_unitario}',
                                            ${dadosFilme.disponibilidade},
                                            '${dadosFilme.id_classificacao}'

            )`
        }

        //$executeRawUnsafe() - serve para executar scripts sem retorno de dados
        //(insert, update e delete)
        //$queryRawUnsafe() - serve para executar scripts com retorno de dados (select)
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        
        if(result){
            let idFilme=await IDFilme()
            //loop para inserir os generos na tabela intermediária
            for(let genero of dadosFilme.id_genero){
                sql=`insert into tbl_filme_genero(
                        id_filme,
                        id_genero
                    ) values(
                        ${idFilme[0].id},
                        ${genero}
                    )`
                let result = await prisma.$executeRawUnsafe(sql)
                //enquanto os dados estiverem sendo inseridos o loop vai continuar, caso aconteça algum erro, o código para e retorna falso
                if(result)
                    return true
                else
                    return false
            }
            //loop para inserir os atores na tabela intermediária
            for(let ator of dadosFilme.id_ator){
                sql=`insert into tbl_filme_ator(
                    id_filme,
                    id_ator
                    ) values(
                        ${idFilme[0].id},
                        ${ator}
                    )`
                let result=await prisma.$executeRawUnsafe(sql)
                //enquanto os dados estiverem sendo inseridos o loop vai continuar, caso aconteça algum erro, o código para e retorna falso
                if(result)
                    return true
                else
                    return false
            }
        }    


    } catch (error) {
        return false
    }
}

//Função para atualizar um filme no Banco de Dados
const updateFilme = async function(id, dadosFilme) {

    try {
        
        let sql

        if( dadosFilme.data_relancamento != ''      &&
            dadosFilme.data_relancamento != null    &&
            dadosFilme.data_relancamento != undefined
        ){

            sql = `update tbl_filme set nome =              '${dadosFilme.nome}',
                                        sinopse =           '${dadosFilme.sinopse}',
                                        duracao =           '${dadosFilme.duracao}',
                                        data_lancamento =   '${dadosFilme.data_lancamento}',
                                        data_relancamento = '${dadosFilme.data_relancamento}',
                                        foto_capa =         '${dadosFilme.foto_capa}',
                                        valor_unitario =    '${dadosFilme.valor_unitario}',
                                        id_classificacao =  '${dadosFilme.id_classificacao}',
                                        where id =           ${id}`

        } else {
            sql = `update tbl_filme set nome =              '${dadosFilme.nome}',
                                        sinopse =           '${dadosFilme.sinopse}',
                                        duracao =           '${dadosFilme.duracao}',
                                        data_lancamento =   '${dadosFilme.data_lancamento}',
                                        data_relancamento = '${dadosFilme.data_relancamento}',
                                        foto_capa =         '${dadosFilme.foto_capa}',
                                        valor_unitario =    '${dadosFilme.valor_unitario}',
                                        id_classificacao =  '${dadosFilme.id_classificacao}',
                                        where id =           ${id}`
        }

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

        } catch (error) {
            return false
    }
}

//Função para excluir um filme no Banco de Dados
const deleteFilme = async function(id) {

    try {
        const sql = `delete from tbl_filme where id = ${id}`
        let rsFilme = await prisma.$executeRawUnsafe(sql)
        return rsFilme
    } catch (error) {
        return false
    }

}


//Função para listar todos os filmes do Banco de Dados
const selectAllFilmes = async function() {

    let sql = 'select * from tbl_filme'

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme')
    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    if(rsFilmes.length > 0)
        return rsFilmes
    else
        return false
}


//Função para buscar um filmes do Banco de Dados pelo ID
const selectByIdFilme = async function(id) {

    try {

        //ScriptSQL para buscar um filme pelo ID
        let sql = `select * from tbl_filme where id=${id}`

        //Encaminha o script SQL para o Banco de Dados
        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes

    } catch (error) {

        return false
    }
        
}


const selectNomeFilme = async function (nome) {

    try {

        let sql = `select * from tbl_filme where nome like '%${nome}%';`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme


    } catch (error) {

        return false
    }

}


const IDFilme = async function(){
    try {
        let sql = `SELECT id FROM tbl_filme ORDER BY id DESC LIMIT 1`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}




module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    IDFilme,
    selectNomeFilme
}