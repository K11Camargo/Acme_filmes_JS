/************************************************************************************
 * Objetivo: arquivo responsael pela manipulação de dados no Banco de dados MYSQL, 
 *      aqui realizamos o CRUD (Create, Read, Update, Delete) utilizando a linguagem SQL
 * Data: 01/02/2024
 * Autor: Kelvinn Camargo
 * Versão: 1.0 
 * 
 ************************************************************************************/

//Import da biblioteca prisma client
const { PrismaClient } = require('@prisma/client');

//Instancia da classe prisma client
const prisma = new PrismaClient();

//função para inserir novo filme no banco de dados
const insertFilme = async function(){
}

//Função para atualizar um filme no banco de dados
const updateFilme = async function(){
}

//Função para deletar um filme no banco de dados
const deleteFilme = async function(){
}

//Função para listar todos os filmes no banco de dados
const selectAllFilmes = async function(){

    let sql = 'select * from tbl_filme';

    //podemos usar o $queryRawUnsafe(sql)
    //podemos usar o $queryRaw('select * from tbl_filme')
    //porem usar sempre o primeiro para facilitar em caso de erro futuro 

    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    if(rsFilmes.length > 0)
        return rsFilmes;
    else
        return false;
}

//Função para buscar um filme pelo ID no banco de dados
const selectByIdFilme = async function(id){
    try{
    //script SQL para buscar um filme pelo ID
    let sql = `select * from tbl_filme where id = ${id}`

    //Encaminha o script SQL acima para o Banco de Dados
    let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme;
    }catch(error){
        return false;
    }
    
}

//Função para buscar um filme pelo nome no banco de dados
const selectByNameFilme = async function(nomeFilme){

    try{

    let sql = `select * from tbl_filme where nome like '%${nomeFilme}%'`

    let rsFilme = await prisma.$queryRawUnsafe(sql);

    return rsFilme;
    }catch(error){
        return false;
    }


}




module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNameFilme
}