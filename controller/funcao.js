//Função um

var acmeFilmes = require ('../modulo/filmes.js')

const ListandoFilmes = () => {
    let listadeFilmes = acmeFilmes.catalogo.filmes
    let status = false
    let filmesArray = []
    let filmesJson = {}

    listadeFilmes.forEach((filme) => {
        let filmesInfo = {
            id: filme.id,
            nome: filme.nome,
            sinopse: filme.sinopse,
            duracao: filme.duracao,
            dataLancamento: filme.data_lancamento,
            dataRelancamento: filme.data_relancamento,
            fotoCapa: filme.foto_capa,
            valor: filme.valor_unitario
        }

        status = true
        filmesArray.push(filmesInfo)

    })

    filmesJson.filmes = filmesArray
    if(status){
        return filmesJson
    }else{
        return false
    }

}

console.log(ListandoFilmes())



//Função dois


const buscarFilmesId = (id) => {
    let listadeFilmes = acmeFilmes.catalogo.filmes
    let status = false
    let filmesArray = []
    let filmeJson = {}   
    let infoFilmes = {}
    let filmesId = id

    listadeFilmes.forEach((filme) =>{
        if (filme.id == filmesId){
            infoFilmes = {
                id: filme.id,
                nome: filme.nome,
                sinopse: filme.sinopse,
                duracao: filme.duracao,
                dataLancamento: filme.data_lancamento,
                dataRelancamento: filme.data_relancamento,
                fotoCapa: filme.foto_capa,
                valor: filme.valor_unitario
            }
            status = true
            filmesArray.push(infoFilmes)
        }
        
    })

        filmeJson.filmes = filmesArray

if (status){
    return filmeJson
} else {
    return false
}
}

//console.log(listarFilmes())
console.log(buscarFilmesId(2))