// import cardId from './script.js'
let IdQuizzSelecionado = window.location.hash.substring(1);
const url = "https://mock-api.driven.com.br/api/v4/buzzquizz";
let quizzSelecionado;

let tituloPergunta;
let corPergunta;

const backgroundImage = "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%),";

function mudaFundoQuizz (urlImg){
    const imgDom = document.querySelector(".fundo-quizz");
    imgDom.style.backgroundImage = `${backgroundImage} url('${urlImg}')`;
    // console.log(imgDom);

    const h2Dom = document.querySelector(".fundo-quizz h2");
    h2Dom.innerHTML = quizzSelecionado.title;
}

function montarRespostas(resposta){

    let templateResposta = `<div class="imagens-respostas">
                                <div>
                                    <img src="${resposta.image}" alt="imagem-resposta">
                                    <p>${resposta.text}</p>
                                </div>
                            </div>`;


    // document.querySelector(".mensagens mensagem:last-child");
    const perguntaNoDom = document.querySelector(".perguntas-container .pergunta:last-child");
    const imagemRespostas = perguntaNoDom.lastElementChild;
    imagemRespostas.innerHTML += templateResposta;

    // var ultimoFilho = pai.lastElementChild;

    const corDeFundoTitulo = perguntaNoDom.firstElementChild;

    // console.log(corDeFundoTitulo);
    corDeFundoTitulo.style.backgroundColor = corPergunta;
}

function adicionaNoHtml(){
    
    const perguntas = document.querySelector(".perguntas");
    console.log(quizzSelecionado);


    mudaFundoQuizz(quizzSelecionado.image);
    console.log(quizzSelecionado.questions);
    quizzSelecionado.questions.forEach((pergunta) => {

        corPergunta = pergunta.color;
        tituloPergunta = pergunta.title;
        console.log("COR DA PERGUNTA BACKGROUND COLOR: " + corPergunta);
    

        const respostas = pergunta.answers;
        respostas.sort( () => Math.random() - 0.5)
        const templatePergunta = `<div class="pergunta">
                                    <div class="texto-pergunta"">
                                        <p>${tituloPergunta}</p>
                                    </div>
                                    <div class="imagens-respostas">
                                    </div>
                                </div>`;

        const perguntaNoDom = document.querySelector(".perguntas-container");
        perguntaNoDom.innerHTML += templatePergunta;
        respostas.forEach((resposta) => montarRespostas(resposta));
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
