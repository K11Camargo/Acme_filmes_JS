/**************************************************************************************************************
 * Objetivo: Arquivo para realizar as requisições de filmes
 * Data:08/02/24
 * Autor: Kelvinn Camargo
 * Versão:1.0
/**************************************************************************************************************

Para realizar a integração com o Banco de Dados devemos utilizar uma das dseguintes bibliotecas:
*  -SEQUELIZE   - Mais antiga
*  - PRIMA ORM  - Mais atual (vamos utilizar)
*  - FASTFY ORM - Mais atual

        PARA A INSTALAÇÃO DO PRIMSA ORM:

        npm install prisma --save               (é responsavel pela conexão com o BANCO DE DADOS)
        npm install @prisma/client --save       (é responsavel por executar scripts SQL no BANCO DE DADOS)
*************************************************************************************************************

    PARA INICIAR O PRISMA NO PROJETO DEVEMOS:
        instalar com o prisma
        instalar o client com @prisma/client
        e iniciar ele com o npx prisma init
*************************************************************************************************************/


const express = require('express')
const cors = require ('cors')
const {request} = require('http')
const {access} = require('fs')

const app = express()

app.use((request, response, next) => {
    
    response.header('Access-Control-Allow-Origin', "*") 
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())
    next()
})


const controllerFilmes = require('./controller/controller_filme.js')

    //Criando os endpoints


//versão 1.0 que retorna os dados de um arquivo de filmes
//Periodo de utilização 01/01/24
app.get('/v1/acmefilmes/filmes', cors(), async function(request,response){

        let controllerFilmes = require('./controller/funcao.js');

        let filmes = controllerFilmes.getFilmes();
        if(filmes){
                response.json(filmes);
                response.status(200);
        }else{
                response.status(400);
        }

});


//versão 1.0 que retorna os dados de um arquivo de filmes
//Periodo de utilização 08/12/24
app.get('/v2/acmefilmes/filmes', cors(), async function(request,response){


//Chama a função da controller para retornar todos os filmes
        let dadosFilmes = await controllerFilmes.getListarFilmes();


//validação para verificar se existem dados a serem retornados
        if(dadosFilmes){
                response.json(dadosFilmes);
                response.status(200);
        }else{
                response.json({message: "Nenhum registro encontrado pae"})
                response.status(404);
        }

});

//ENDPOINT RETORNA OS DADOS FILTRANDO PELO ID
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response){
    
        let idFilme = request.params.id;
        let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme);

        response.status(dadosFilme.status_code);
        response.json(dadosFilme);
});

app.get('/v2/acmefilmes/filme', cors(), async function(request, response){
    
        let nomeFilme = request.query.nomeFilme;
        let dadosFilme = await controllerFilmes.getBuscarFilmebyname(nomeFilme);

        response.status(dadosFilme.status_code);
        response.json(dadosFilme);
});

app.listen(8080, function(){
        console.log("ligada");
});
