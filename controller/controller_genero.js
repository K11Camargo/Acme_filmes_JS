/***********************************************************************************************************
* Objetivo: Arquivo responsável pelas validações e consistencias de dados de Genero
* Data: 24/04/2024
* Autor: Kelvinn Camargo
* Versão: 1.0
***********************************************************************************************************/

//Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')
//Import do arquivo responsável pela interação como Banco de Dados (model)
const generosDAO = require('../model/DAO/genero.js')

const setInserirNovoGenero = async function (dadosGenero, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let novoGeneroJSON = {}

            if( dadosGenero.nome == ''               || dadosGenero.nome == undefined           || dadosGenero.nome.length > 80
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else {

              let novoGenero = await generosDAO.insertGenero(dadosGenero);

              if(novoGenero){
      
                  novoGeneroJSON.status = message.SUCCESS_CREATED_ITEM.status;
                  novoGeneroJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                  novoGeneroJSON.message = message.SUCCESS_CREATED_ITEM.message;
                  novoGeneroJSON.genero = dadosGenero;
      
                  return novoGeneroJSON; // 201
              } else{
                  return message.ERROR_INTERNAL_SERVER_DB; // 500 
               }
             }
          }else{
              return message.ERROR_CONTENT_TYPE // 415 Erro no content type
          }
      } catch(error){
          return message.ERROR_INTERNAL_SERVER // 500 
      }
           
}
      
const setAtualizarGenero = async function (id, dadoAtualizado, contentType) {
    try {
        let idGenero = id

        if (String(contentType).toLowerCase() == 'application/json') {
            let dadosID = generosDAO.selectByIdGenero()

            if (idGenero == '' || idGenero == undefined || idGenero == isNaN(idGenero) || idGenero == null) {
                return message.ERROR_INVALID_ID
            } else if (idGenero > dadosID.length) {
                return message.ERROR_NOT_FOUND
            } else {

                let atualizarGeneroJSON = {}

                if (dadoAtualizado.nome == '' || dadoAtualizado.nome == undefined || dadoAtualizado.nome == null || dadoAtualizado.nome.length > 80) {
                    return message.ERROR_REQUIRED_FIELDS
                } else {

                    let validateStatus = false

                    if (validateStatus) {

                        let dadosGenero = await generosDAO.updateGenero(idGenero, dadoAtualizado)

                        if (dadosGenero) {

                            atualizarGeneroJSON.genero = dadosGenero
                            atualizarGeneroJSON.status = message.SUCCESS_UPDATED_ITEM.status
                            atualizarGeneroJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                            atualizarGeneroJSON.message = message.SUCCESS_UPDATED_ITEM.message
                            return atualizarGeneroJSON //201

                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB //500
                        }
                    } else {
                        validateStatus = false
                    }

                }

            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 - erro na controller
    }
}

const setExcluirGenero = async function (id) {

    let idGeneros = id;

    try {
        
        if(idGeneros == '' || idGeneros == undefined || isNaN(idGeneros)){
            return message.ERROR_INVALID_ID;
        }else{
            
            let dadosGenero = await atorDAO.selectByIdGenero(idGeneros) 
            let validarId = dadosGenero.length 
    
            if (validarId > 0) {
    
            dadosGenero = await generosDAO.deleteGenero(idGeneros)
            
            return message.SUCCESS_DELETED_ITEM
    
            } else {
                return message.ERROR_NOT_FOUND
            }
    }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}


const getListarGeneros = async function () {

    let generosJSON = {}

    let dadosGeneros = await generosDAO.selectAllGeneros()

    if (dadosGeneros) {

        generosJSON.generos = dadosGeneros
        generosJSON.quantidade = dadosGeneros.length
        generosJSON.status_code = 200

        return generosJSON
    } else {
        return false
    }

}

const getBuscarGenero = async function (id) {

    let idGenero = id

    let generoJSON = {}

    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosGenero = await generosDAO.selectByIdGenero(idGenero)

        if (dadosGenero) {

            if (dadosGenero.length > 0) {

                generoJSON.genero = dadosGenero
                generoJSON.status_code = 200

                return generoJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovoGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getListarGeneros,
    getBuscarGenero
}