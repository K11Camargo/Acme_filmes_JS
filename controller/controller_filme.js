/******************************************************************************************
 * Objetivo: arquivo responsael pelas validações e consistencias de dados de Filme 
 * Data: 01/02/2024
 * Autor: Kelvinn Camargo
 * Versão: 1.0 
 * 
******************************************************************************************/

//Faz o import do arquivo de configuração do projeto
const message = require('../modulo/config.js')



//Import do arquivo responsavel pela interação com BANCO DE DADOS
const FilmesDAO = require('../model/DAO/filme.js');

//Função para inserir um novo Filme
const setInserirNovoFilme = async function(){
    
}

//Função para atualizar um Filme
const setAtualizarFilme = async function(){
    
}

//Função para excluir um Filme
const setExcluirFilme = async function(){
    
}

//Função para listar todos Filme
const getListarFilmes = async function(){
    

//cria um objeto JSON
    let filmesJSON = {};


//chama a função DAO que retorna os filmes do BANCO
    let dadosFilmes = FilmesDAO.selectAllFilmes();


//validação para verificar se o DAO retornou dados
    if(dadosFilmes){
//criando JSON para retornar as informações para o APP
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;

        return filmesJSON
    } else{
        return false;
    }

}

//Função para buscar os Filmes pelo ID
const getBuscarFilme = async function(id){
    
    //RECEBE O ID DO FILME
    let idFilme = id

    //CRIA O OBJETO JSON
    let filmeJSON = {}


    //VALIDAÇÃO PARA VERIFICAR SE ID É VALIDO
    if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID;
    } else{

        //ENCAMINHA PARA O DAO LOCALIZAR O ID DO FILME
        let dadosFilme = await FilmesDAO.selectByIdFilme(idFilme)


        //VALIDAÇÃO PARA VERIFICAR SE EXISTEM DADOS DE RETORNO
        if(dadosFilme){


            //IF com lenght serve para verificar a quantidade de itens encontrados
            if(dadosFilme.length > 0) {
                //CRIA O JSON DE RETORNO
                filmeJSON.filme = dadosFilme;
                filmeJSON.status_code = 200;

                return filmeJSON;
            } else {
                return message.ERROR_NOT_FOUND;
            }
            
        }else{
            return message.ERROR_INTERNAL_SERVER_DB;
        }
    }
}

//Função para buscar os Filmes pelo nome
const getBuscarFilmebyname = async function(nomeFilme){

    let nome = nomeFilme

    let filmeJSON = {}

if(nome == '' || nome == undefined){
    return message.ERROR_INVALID_ID;
} else{

    let dadosFilme = await FilmesDAO.selectByNameFilme(nome)


    if(dadosFilme){


        if(dadosFilme.length > 0) {
            filmeJSON.filme = dadosFilme;
            filmeJSON.status_code = 200;

            return filmeJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        }
        
    }else{
        return message.ERROR_INTERNAL_SERVER_DB;
    }
}

}


module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getBuscarFilmebyname
}