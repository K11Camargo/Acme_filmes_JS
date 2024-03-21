/******************************************************************************************
 * Objetivo: arquivo responsael pela padronização de variaveis e constantes globais do projeto
 * Data: 22/02/2024
 * Autor: Kelvinn Camargo
 * Versão: 1.0 
******************************************************************************************/

/***********************   MENSAGENS DE ERRO DO PROJETO   ******************************/

const ERROR_INVALID_ID          = {status:false, status_code:400, message:'O ID inserido é invalido!!'}
const ERROR_REQUIRED_FIELDS     = {status:false, status_code:400, message:'Existem campos requeridos que não foram preenchidos, ou não atendem os criterios de digitação!!'}
const ERROR_NOT_FOUND           = {status:false, status_code:404, message:'Não foi encontrado nenhum item!!'}
const ERROR_INTERNAL_SERVER_DB  = {status:false, status_code:500, message:'Não foi possivel processar a requisição devido a um erro no acesso ao banco de dados!!'}
const ERROR_CONTENT_TYPE        = {status:false, status_code:415, message:'O content-type encaminhado na requisição não é suportado pelo servidor. Deve-se encaminhar apenas requisições com application/json !!'}
const ERROR_INTERNAL_SERVER     = {status:false, status_code:500, message:'Não foi possivel processar a requisição devido a um erro no acesso ao banco de dados!!'}



/**************************************************************************************/
/***********************   MENSAGENS DE SUCESSO DO PROJETO   ******************************/

const SUCCESS_CREATED_ITEM= {status:true, status_code:201, message:'Item criado com sucesso!!'}

/**************************************************************************************/




module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_INTERNAL_SERVER,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE
}