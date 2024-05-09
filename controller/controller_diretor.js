/***********************************************************************************************************
* Objetivo: Arquivo responsável pelas validações e consistencias de dados de Ator
* Data: 01/02/2024
* Autor: Kelvinn Camargo
* Versão: 1.0
***********************************************************************************************************/

//Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')
//Import do arquivo responsável pela interação como Banco de Dados (model)
const diretorDAO = require('../model/DAO/diretor.js')

//Função para listar todos os Filmes
const getlistarDiretores = async function() {

    //Cria um objeto JSON
    let diretorJSON = {}

    //Chama a função do DAO que retorna os filmes do Banco de Dados
    let dadosDiretor = await diretorDAO.selectAllDiretor()

    //Validação para verificar se o DAO retornou dados
    if(dadosDiretor) {
        //Cria o JSON para retornar para o APP
        diretorJSON.filmes = dadosDiretor
        diretorJSON.quantidade = dadosDiretor.length
        diretorJSON.status_code = 200

        return diretorJSON
    } else {
        return false
    }

}

const getBuscarDiretores = async function(id) {

    //Recebe o ID do Filme
    let idDiretor = id

    //Cria o objeto JSON
    let diretorJSON = {}

    //Validação para verificar se ID é válido (vazio, indefinido e não numérico)
    if(idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha para o DAO localizar o ID do filme
        let dadosDiretor = await diretorDAO.selectByIdDiretor(idDiretor)

        //Validação para verificar se existem dados de retorno
        if(dadosDiretor) {

            //Validação para verificar a quantidade de itens encontrados
            if(dadosDiretor.length > 0) {

                //Cria o JSON de retorno
                diretorJSON.filme =  dadosDiretor
                diretorJSON.status_code = 200

                return diretorJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

//Função para excluir um novo Filme
const setExcluirDiretor = async function(id) {

    let idDiretor = id

    if (idDiretor == '' || idDiretor == undefined || idDiretor == isNaN(idDiretor) || idDiretor == null) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosDiretor = await diretorDAO.selectByIdDiretor(idDiretor) 
        let validarId = dadosDiretor.length 

        if (validarId > 0) {

        dadosDiretor = await diretorDAO.deleteDiretor(idDiretor)
        
        return message.SUCCESS_DELETED_ITEM

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const setInserirNovoDiretor = async function(dadosDiretor, contentType) {

    try {

        //Validação de content-type (apenas application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            //Cria o objeto JSON para devolver os dados criados na requisição
            let novoDiretorJSON = {}

            //Validação de campos obrigatórios ou com digitação inválida
            if( dadosDiretor.nome == ''                        || dadosDiretor.nome == undefined             || dadosDiretor.nome == null               || dadosDiretor.nome.length > 80               ||
                dadosDiretor.data_nascimento == ''             || dadosDiretor.data_nascimento == undefined  || dadosDiretor.data_nascimento == null    || dadosDiretor.data_nascimento.length != 10   ||
                dadosDiretor.biografia == ''                   || dadosDiretor.biografia == undefined        || dadosDiretor.biografia == null          || dadosDiretor.biografia.length > 6500        ||
                dadosDiretor.foto == ''                        || dadosDiretor.foto == undefined             || dadosDiretor.foto == null               || dadosDiretor.foto.length > 200
            ){
            
                return message.ERROR_REQUIRED_FIELDS //400

            }else {

                let validateStatus = false

                //Validação da data de relançamento, já que ela não é obrigatória no Banco de Dados

                if (dadosDiretor.data_falescimento != null   &&
                    dadosDiretor.data_falescimento  != ''     &&
                    dadosDiretor.data_falescimento  != undefined ) {

                    //Validação para verificar se a data está com a quantidade de digitos corretos
                    if (dadosDiretor.data_falescimento.length != 10){
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
                    let novoDiretor = await diretorDAO.inserirDiretor(dadosDiretor)

                    //Validação para verificar se DAO inseriu os dados do Banco
                    if(novoDiretor){

                    //Cria o JSON de retorno dos dados (201)
                    novoDiretorJSON.filme       = dadosDiretor
                    novoDiretorJSON.status      = message.SUCCESS_CREATED_ITEM.status
                    novoDiretorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novoDiretorJSON.message     = message.SUCCESS_CREATED_ITEM.message

                        return novoDiretorJSON //201
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
    getlistarDiretores,
    setExcluirDiretor,
    setInserirNovoDiretor,
    getBuscarDiretores
    
}