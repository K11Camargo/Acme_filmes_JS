/***********************************************************************************************************
* Objetivo: Arquivo para realizar as requisições de Filme
* Data: 08/02/2024
* Autor: Kelvinn Camargo
* Versão: 1.0
***********************************************************************************************************/
/***********************************************************************************************************
 *  Para realizar a integração com o Banco de Dados devemos utilizar uma das seguintes bibliotecas:
 *      - SEQUELIZE     - É a biblioteca mais antiga
 *      - PRISMA ORM    - É a biblioteca mais atual (Utilizaremos no projeto)
 *      - FASTFY ORM    - É a biblioteca mais atual
 * 
 *      Para instalação do PRISMA ORM:
 *          npm install prisma --save            (É responsável pela conexão com o Banco de Dados)
 *          npm install @prisma/client --save   (É responsável por executar scripts SQL no Banco)
 * 
 *      Para iniciar o prisma no projeto, devemos:
 *          npx prisma init
 ************************************************************************************************************/

/******************************Import dos arquivos de Controller do projeto *********************************/

const controllerFilmes = require('./controller/controller_filme.js')
const controllerGeneros = require('./controller/controller_genero.js')
const controllerClassificacao = require('./controller/controller_classificacao.js')
const controllerAtor = require('./controller/controller_ator.js')
const controllerDiretor = require('./controller/controller_diretor.js')


/********************************************************************************************************** */

const express       = require('express')
const cors          = require ('cors')
const bodyParser    = require('body-parser')

//Cria um objeto app tendo como referência a classe do express
const app = express()

app.use((request, response, next) => {
    
    response.header('Access-Control-Allow-Origin', "*") 
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()
})

const bodyParserJSON = bodyParser.json()

app.use((request, response, next) => {

    //Permite especificar quem poderá acessar a API('*' - libera o acesso publico, 'IP' - libera acesso apenas para aquela máquina)
    response.header('Access-Control-Allow-Origin', '*')

    //Permite especificar como a API, será requisitada (GET, POST, PUT e DELETE)
    response.header('Access-Control-Allow-Methods', 'GET')

    //Ativa as configurações de permissão do cors
    app.use(cors())

    next()
})

//EndPoints: Versão 1.0 que retorna os dados de um arquivo de filmes
//Período de utilização 01/2024 até 02/2024
app.get('/v1/acmeFilmes/filmes', cors(), async function (request, response, next) {

    let controllerFilmes = require('./controller/funcao.js')
    
    let filmes = await controllerFilmes.getFilmes()
    
    if (filmes) {
        response.json(filmes)
        response.status(200)
    } else {
        response.status(400)
    }
})


//EndPoints: Versão 2.0 - Retorna os dados do filme do Banco de Dados
app.get('/v2/acmeFilmes/filmes', cors(), async function (request, response, next) {
    
    //Chama a função da controller para retornar todos os filmes
    let dadosFilmes = await controllerFilmes.getListarFilmes()
    
    //Validação para verificar se existem dados a serem retornados
    if (dadosFilmes) {
        response.json(dadosFilmes)
        response.status(200)
    } else {
        response.json({ message: 'Nenhum registro encontrado' })
        response.status(404)
    }

})

//EndPoint: Retorna os dados filtrando pelo ID
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response) {

    //Recebe o ID da requisição
    let idFilme = request.params.id

    //Encaminha o ID para a controller buscar o Filme
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

//EndPoint: Retorna os dados filtrando pelo nome dele
app.get('/v2/acmefilmes/filme', cors(), async function(request, response) {

    let nome = request.query.nome

    let dadosFilme = await controllerFilmes.getNomeFilme(nome)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.post('/v2/acmefilmes/filme',  cors(), bodyParserJSON, async (request, response, next) =>{

    let contentType = request.headers['content-type']

    //Recebe os dados encaminhados no Body da requisição
    let dadosBody = request.body

    //Encaminha os dados para cotroller inserir no BD
    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.delete('/v2/filme/acmefilmes/:id', cors(), async function (request, response) {

    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})

app.put('/v2/acmefilmes/updateFilme/:id', cors(), bodyParserJSON, async function (request, response, next) {
    
    let contentType = request.headers['content-type']
    let idFilme = request.params.id
    let dadosBody = request.body

    let resultUpdateFilme = await controllerFilmes.setAtualizarFilme(idFilme, dadosBody, contentType)

    response.status(resultUpdateFilme.status_code)
    response.json(resultUpdateFilme)
})

//***************************************************************
// GENERO
// **************************************************************

    
//EndPoints: Retorna todos os Generos do Banco de Dados
app.get('/v3/acmefilmes/genero', cors(), async function (request, response, next) {
    
    let dadosGeneros = await controllerGeneros.getListarGeneros()
    
    //Validação para verificar se existem dados a serem retornados
    if (dadosGeneros) {
        response.json(dadosGeneros)
        response.status(200)
    } else {
        response.json({ message: 'Nenhum registro encontrado' })
        response.status(404)
    }
})

//EndPoints: Retorna o Generos definido pelo ID do Banco de Dados
app.get('/v3/acmefilmes/genero/:id', cors(), async function(request, response) {

    //Recebe o ID da requisição
    let idGenero = request.params.id

    //Encaminha o ID para a controller buscar o Genero
    let dadosGenero = await controllerGeneros.getBuscarGenero(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})


//EndPoints: Insere um novo Genero no Banco de Dados
app.post('/v3/acmefilmes/genero', cors(), bodyParserJSON, async function (request, response, next){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let dadosNovoGenero = await controllerGeneros.setInserirNovoGenero(dadosBody,contentType)

    response.status(dadosNovoGenero.status_code)
    response.json(dadosNovoGenero)
})

app.delete('/v3/acmefilmes/genero/:id', cors(), async function (request, response) {

    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})

//***************************************************************
// CLASSIFICAÇÃO
//**************************************************************

app.get('/v4/acmefilmes/classificacao', cors(), async function(request, response, next){

    // Chama a função para retornar os dados da classificacao
    let dadosClassificacao = await controllerClassificacao.getListarClassficacao();

    // Validação para verificar se existem dados
    if(dadosClassificacao){
        response.json(dadosClassificacao)
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
});

app.get('/v4/acmefilmes/classificacao/:id', cors(), async function(request, response, next){
    // Recebe o id da requisição 
    let idClassificacao = request.params.id;

    // Solicita para a controller o ator filtrando pelo id
    let dadosClassificacao = await controllerClassificacao.getListarClassficacaoById(idClassificacao);

     response.status(dadosClassificacao.status_code);
     response.json(dadosClassificacao);
   
});

app.delete('/v4/acmefilmes/classificacao/:id', cors(), async function(request, response, next){

    let idClassificacao = request.params.id

    let resultDados = await controllerClassificacao.setDeleteClassficacao(idClassificacao);

    response.status(resultDados.status_code);
    response.json(resultDados);
});

app.post('/v4/acmefilmes/insertclassificacao', cors(), bodyParserJSON, async function(request, response, next){

    // Recebe o content-type da requisição (API deve receber application/json )
   let contentType = request.headers['content-type'];

   // Recebe os dados encaminhados na requisição do body (JSON)
   let dadosBody = request.body;

   
   // Encaminha os dados da requisição para a controller enviar para o banco de dados
   let resultDados = await controllerClassificacao.setInserirNovaClassificacao(dadosBody, contentType);

   response.status(resultDados.status_code);
   response.json(resultDados);
});



//***************************************************************
// ATORES
//**************************************************************

app.get('/v5/acmefilmes/ator', cors(), async function (request, response, next) {
    
    //Chama a função da controller para retornar todos os filmes
    let dadosAtor = await controllerAtor.getListarAtores()
    
    //Validação para verificar se existem dados a serem retornados
    if (dadosAtor) {
        response.json(dadosAtor)
        response.status(200)
    } else {
        response.json({ message: 'Nenhum registro encontrado' })
        response.status(404)
    }

});

app.get('/v5/acmefilmes/ator/:id', cors(), async function(request, response, next){
    // Recebe o id da requisição 
    let idAtor = request.params.id;

    // Solicita para a controller o ator filtrando pelo id
    let dadosAtor = await controllerAtor.getBuscarAtor(idAtor);

     response.status(dadosAtor.status_code);
     response.json(dadosAtor);
   
});

app.delete('/v5/acmefilmes/ator/:id', cors(), async function(request, response, next){

    let idAtor = request.params.id

    let resultDados = await controllerAtor.setExcluirAtor(idAtor);

    response.status(resultDados.status_code);
    response.json(resultDados);
});

app.post('/v5/acmefilmes/ator',  cors(), bodyParserJSON, async (request, response, next) =>{

    let contentType = request.headers['content-type']

    //Recebe os dados encaminhados no Body da requisição
    let dadosBody = request.body

    //Encaminha os dados para cotroller inserir no BD
    let resultDados = await controllerAtor.setInserirNovoAtor(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

});



//***************************************************************
// DIRETORES
//**************************************************************

app.get('/v6/acmefilmes/diretor', cors(), async function (request, response, next) {
    
    //Chama a função da controller para retornar todos os filmes
    let dadosDiretor = await controllerDiretor.getlistarDiretores()
    
    //Validação para verificar se existem dados a serem retornados
    if (dadosDiretor) {
        response.json(dadosDiretor)
        response.status(200)
    } else {
        response.json({ message: 'Nenhum registro encontrado' })
        response.status(404)
    }

});

app.get('/v6/acmefilmes/diretor/:id', cors(), async function(request, response, next){
    // Recebe o id da requisição 
    let idDiretor = request.params.id;

    // Solicita para a controller o ator filtrando pelo id
    let dadosDiretor = await controllerDiretor.getBuscarDiretores(idDiretor);

     response.status(dadosDiretor.status_code);
     response.json(dadosDiretor);
   
});

app.delete('/v6/acmefilmes/diretor/:id', cors(), async function(request, response, next){

    let idDiretor = request.params.id

    let resultDados = await controllerDiretor.setExcluirDiretor(idDiretor);

    response.status(resultDados.status_code);
    response.json(resultDados);
});

app.post('/v6/acmefilmes/diretor',  cors(), bodyParserJSON, async (request, response, next) =>{

    let contentType = request.headers['content-type']

    //Recebe os dados encaminhados no Body da requisição
    let dadosBody = request.body

    //Encaminha os dados para cotroller inserir no BD
    let resultDados = await controllerDiretor.setInserirNovoDiretor(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

});



app.listen(8080, function(){
    console.log("api ligada paizão")
})