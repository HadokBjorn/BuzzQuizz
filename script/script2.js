// import cardId from './script.js'
let IdQuizzSelecionado = window.location.hash.substring(1);
const url = "https://mock-api.driven.com.br/api/v4/buzzquizz";
let quizzSelecionado;

let IdPergunta = 1;

let tituloPergunta;
let corPergunta;

let desempenhoRespostas = [];

const backgroundImage = "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%),";


function verificarResposta(resposta){
    // se a resposta foi dada não há como mudar
    if(resposta.parentNode.classList.contains("respondido")){
        return null;
    }

    // adiciona uma forma de saber se deu a resposta anteriormente
    resposta.parentNode.classList.add("respondido");
    desempenhoRespostas.push(resposta.classList[0]);


    let perguntaSelecionada;

    // adiciona opacidade para a carta selecionada
    resposta.classList.add("selecionada");

    const perguntasDom = document.querySelectorAll(".perguntas-container .pergunta");
    // procurar no Dom qual foi a pergunta selecionada para modificar suas propriedades
    for(let i = 0; i < perguntasDom.length; i++){
        if(perguntasDom[i] == resposta.parentNode.parentNode){
            perguntaSelecionada = perguntasDom[i];
        }
    }

    // procura a resposta certa e deixa seu texto verde
    const listaRespostas = perguntaSelecionada.lastElementChild.children;
    for(let j = 0; j < listaRespostas.length; j++){
        // console.log(listaRespostas[0].classList[0]);
        if(listaRespostas[j].classList[0] == "true"){
            // console.log("ACHEI A RESPOSTA CERTA!");
            // console.log(listaRespostas[j].classList[0]);
            listaRespostas[j].classList.add("certa");
        }else{
            listaRespostas[j].classList.add("errada");
        }
    }
    for(let j = 0; j < listaRespostas.length; j++){
        // se não contem a classe selecionada adiciona filtro
        console.log(listaRespostas[j].classList);
        if(!(listaRespostas[j].classList.contains("selecionada"))){
            listaRespostas[j].classList.add("resposta-nao-selecionada");
        }
    }
    console.log(listaRespostas);

    // com essa lista consigo descrever o desemppenho que o usuario teve no quizz
    console.log(desempenhoRespostas);



   
}

function mudaFundoQuizz (urlImg){
    const imgDom = document.querySelector(".fundo-quizz");
    imgDom.style.backgroundImage = `${backgroundImage} url('${urlImg}')`;

    const h2Dom = document.querySelector(".fundo-quizz h2");
    h2Dom.innerHTML = quizzSelecionado.title;
}

function montarRespostas(resposta){

    const boolResposta = resposta.isCorrectAnswer; 

    let templateResposta = `<div onclick="verificarResposta(this)" class="${boolResposta} " >
                                <img src="${resposta.image}" alt="imagem-resposta">
                                <p>${resposta.text}</p>
                            </div>`;

    // document.querySelector(".mensagens mensagem:last-child");
    const perguntaNoDom = document.querySelector(".perguntas-container .pergunta:last-child");
    const imagemRespostas = perguntaNoDom.lastElementChild;
    imagemRespostas.innerHTML += templateResposta;

    // var ultimoFilho = pai.lastElementChild;

    const corDeFundoTitulo = perguntaNoDom.firstElementChild;

    corDeFundoTitulo.style.backgroundColor = corPergunta;
}

function adicionaNoHtml(){
    

    mudaFundoQuizz(quizzSelecionado.image);
    quizzSelecionado.questions.forEach((pergunta) => {

        corPergunta = pergunta.color;
        tituloPergunta = pergunta.title;    

        const respostas = pergunta.answers;
        respostas.sort( () => Math.random() - 0.5)
        const templatePergunta = `<div class="pergunta ${IdPergunta}">
                                    <div class="texto-pergunta"">
                                        <p>${tituloPergunta}</p>
                                    </div>
                                    <div class="imagens-respostas">
                                    </div>
                                </div>`;

        const perguntaNoDom = document.querySelector(".perguntas-container");
        perguntaNoDom.innerHTML += templatePergunta;
        respostas.forEach((resposta) => montarRespostas(resposta));

        IdPergunta++
    });
}

function buscarQuizzSelecionado(quizz){
    if(quizz.id == IdQuizzSelecionado){
        quizzSelecionado = quizz;
    }
}

function sucessoObterQuizzes(callback){
    const quizzes = callback.data;

    quizzes.forEach(buscarQuizzSelecionado);

    adicionaNoHtml();
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


