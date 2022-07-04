const formulario = document.querySelector('form');

formulario.addEventListener('submit', function (event) {

    // Bloqueia o refreshing da página
    event.preventDefault();

    // Url da pesquisa
    let urlForm = "https://pokeapi.co/api/v2/pokemon/";

    // Valor do inpute Nome
    let nome = document.getElementById('nome');

    // Concatena a url com inputname
    urlForm = urlForm + this.nome.value;

    // Transforma os valores em minúsculo
    urlForm = urlForm.toLowerCase();

    // ID Content
    let resposta = document.getElementById("content");

    // ID imgPokemon
    let imagem = document.getElementById("imgPokemon");

    // Resposta em HTML
    let html = "";

    fetch(urlForm)
        .then(resposta => resposta.json())
        .then(function (data) {
            console.log(data);
            html = "Nome: " + maiuscula(data.name) + '<br>'
            html = html + "Tipo: " + maiuscula(data.types[0].type.name);
            resposta.innerHTML = html;

            if (data.sprites.front_default == null && data.sprites.back_default == null) {
                imagem.innerHTML = "<h1>Não possui imagem! </h1>"
            } else {
                imagem.innerHTML = "<img src='" + data.sprites.front_default + "'> <img src='" + data.sprites.back_default + "'>"
            }
        })
        .catch(function (error) {
            if (error == "SyntaxError: Unexpected token N in JSON at position 0") {
                html = "Pokémon não encontrado! 😒"
                imagem.innerHTML = ""
            } else {
                html = "ERROR: " + error
            }
            resposta.innerHTML = html
        })
});

function maiuscula(valor) {
    return valor[0].toUpperCase() + valor.substr(1);
}