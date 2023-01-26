// import cardId from './script.js'
let IdQuizzSelecionado = window.location.hash.substring(1);
const url = "https://mock-api.driven.com.br/api/v4/buzzquizz";
let quizzSelecionado;

function adicionaNoHtml(){
    const perguntas = document.querySelector(".perguntas");

    let templatePergunta;
}

function renderizarQuizzSelecionado(){
    
}

function buscarQuizzSelecionado(quizz){
    if(quizz.id == IdQuizzSelecionado){
        quizzSelecionado = quizz;
    }
}

function sucessoObterQuizzes(callback){
    const quizzes = callback.data;

    quizzes.forEach(buscarQuizzSelecionado);

    renderizarQuizzSelecionado();
}

function erroObterQuizzes(){
    console.log("ERRO AO OBTER QUIZZES");
}

function obterQuizzes(){

    const promise = axios.get(`${url}/quizzes`);
    promise.then(sucessoObterQuizzes);
    promise.catch(erroObterQuizzes);
}

obterQuizzes();
// console.log(IdQuizz);
