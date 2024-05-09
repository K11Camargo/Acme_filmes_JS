/***********************************************************************************************************
* Objetivo: Arquivo responsável pelas validações e consistencias de dados de Ator
* Data: 01/02/2024
* Autor: Kelvinn Camargo
* Versão: 1.0
***********************************************************************************************************/

//Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')
//Import do arquivo responsável pela interação como Banco de Dados (model)
const atorDAO = require('../model/DAO/ator.js')

//Função para listar todos os Filmes
const getListarAtores = async function() {

    //Cria um objeto JSON
    let filmesJSON = {}

    //Chama a função do DAO que retorna os filmes do Banco de Dados
    let dadosAtor = await atorDAO.selectAllAtores()

    //Validação para verificar se o DAO retornou dados
    if(dadosAtor) {
        //Cria o JSON para retornar para o APP
        filmesJSON.filmes = dadosAtor
        filmesJSON.quantidade = dadosAtor.length
        filmesJSON.status_code = 200

        return filmesJSON
    } else {
        return false
    }

}

const getBuscarAtor = async function(id) {

    //Recebe o ID do Filme
    let idAtor = id

    //Cria o objeto JSON
    let atorJSON = {}

    //Validação para verificar se ID é válido (vazio, indefinido e não numérico)
    if(idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha para o DAO localizar o ID do filme
        let dadosAtor = await atorDAO.selectByIdAtor(idAtor)

        //Validação para verificar se existem dados de retorno
        if(dadosAtor) {

            //Validação para verificar a quantidade de itens encontrados
            if(dadosAtor.length > 0) {

                //Cria o JSON de retorno
                atorJSON.filme =  dadosAtor
                atorJSON.status_code = 200

                return atorJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

//Função para excluir um novo Filme
const setExcluirAtor = async function(id) {

    let idAtor = id

    if (idAtor == '' || idAtor == undefined || idAtor == isNaN(idAtor) || idAtor == null) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosAtor = await atorDAO.selectByIdAtor(idAtor) 
        let validarId = dadosAtor.length 

        if (validarId > 0) {

        dadosAtor = await atorDAO.deleteAtor(idAtor)
        
        return message.SUCCESS_DELETED_ITEM

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const setInserirNovoAtor = async function(dadosAtor, contentType) {

    try {

        //Validação de content-type (apenas application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            //Cria o objeto JSON para devolver os dados criados na requisição
            let novoAtorJSON = {}

            //Validação de campos obrigatórios ou com digitação inválida
            if( dadosAtor.nome == ''                        || dadosAtor.nome == undefined             || dadosAtor.nome == null               || dadosAtor.nome.length > 80               ||
                dadosAtor.nome_artistico == ''              || dadosAtor.nome_artistico == undefined   || dadosAtor.nome_artistico == null     || dadosAtor.nome_artistico.length > 100    ||
                dadosAtor.data_nascimento == ''             || dadosAtor.data_nascimento == undefined  || dadosAtor.data_nascimento == null    || dadosAtor.data_nascimento.length != 10   ||
                dadosAtor.biografia == ''                   || dadosAtor.biografia == undefined        || dadosAtor.biografia == null          || dadosAtor.biografia.length > 6500        ||
                dadosAtor.foto == ''                        || dadosAtor.foto == undefined             || dadosAtor.foto == null               || dadosAtor.foto.length > 200
            ){
            
                return message.ERROR_REQUIRED_FIELDS //400

            }else {

                let validateStatus = false

                //Validação da data de relançamento, já que ela não é obrigatória no Banco de Dados

                if ( dadosAtor.data_falescimento != null   &&
                    dadosAtor.data_falescimento  != ''     &&
                    dadosAtor.data_falescimento  != undefined ) {

                    //Validação para verificar se a data está com a quantidade de digitos corretos
                    if (dadosAtor.data_falescimento.length != 10){
                        return message.ERROR_REQUIRED_FIELDS //400
                    } else {
                        validateStatus = true
                    }
                } else {
                    validateStatus = true
                }

                //Validação para verificar se a variável booleana é verdadeira
                if(validateStatus){

                    //Encaminha os dados do Filme para o DAO inserir no Banco de Dados
                    let novoAtor = await atorDAO.inserirAtor(dadosAtor)

                    //Validação para verificar se DAO inseriu os dados do Banco
                    if(novoAtor){

                    //Cria o JSON de retorno dos dados (201)
                    novoAtorJSON.filme       = dadosAtor
                    novoAtorJSON.status      = message.SUCCESS_CREATED_ITEM.status
                    novoAtorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novoAtorJSON.message     = message.SUCCESS_CREATED_ITEM.message

                        return novoAtorJSON //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch(error) {
        return message.ERROR_INTERNAL_SERVER //500 - Erro na controller
    }
}

module.exports = {
    getListarAtores,
    setExcluirAtor,
    setInserirNovoAtor,
    getBuscarAtor
    

}
