// import cardId from './script.js'
let IdQuizzSelecionado = window.location.hash.substring(1);
const url = "https://mock-api.driven.com.br/api/v4/buzzquizz";
let quizzSelecionado;

let IdPergunta = 1;

let tituloPergunta;
let corPergunta;

let desempenhoRespostas = [];
let niveisDesempenho = [];
let resultadoQuizz = 0;

const backgroundImage = "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%),";


function adicionaDesempenhoNoHtml(titulo, texto, imagem){
    const templateDesempenho = `<div class="fim-do-quizz ">
                                    <div class="texto-desempenho">
                                        <p>${resultadoQuizz}% de acerto: ${titulo}</p>
                                    </div>
                                    <div class="texto-nivel">
                                        <img src="${imagem}" alt="teste">
                                        <div>
                                            <p>${texto}</p>
                                        </div>
                                    </div>
                                </div>`;

    const templateBotoes = `<div class="botoes-fim">
                              
                                    <button onclick="reiniciarQuizz()" class="reiniciar">Reiniciar Quizz</button>
                                
                                <a href="../index.html">
                                    <button class="home">Voltar pra Home</button>
                                 </a>
                            </div>`

    const containerPerguntas = document.querySelector(".perguntas-container");
    containerPerguntas.innerHTML += templateDesempenho + templateBotoes;    

}

function teste(){
    console.log("BOTAO FUNCIONANDO NORMALLMENTE");
}

function scrollFimDoQuizz(){
    const fimQuizz = document.querySelector(".botoes-fim");
    fimQuizz.scrollIntoView({block: "end", behavior: "smooth"});
}

function verificaFimQuizz(){
    const imagemRespostas = document.querySelectorAll(".pergunta .imagens-respostas");
    for(let i = 0; i < imagemRespostas.length; i++){
        let naoRespondido = !(imagemRespostas[i].classList.contains("respondido"));
        if (naoRespondido){
            return null;
        }
    }

    const nivelDesempenho = niveisDesempenho.filter(nivel => {
        const minValue = Number(nivel.minValue);
        if(minValue <= resultadoQuizz){
            return true;
        }else{
            return false;
        }
    });

    loadingAdd();
    // o primeiro elemento corresponde a primeira vez que o nivel foi satisfeito
    const nivelDesempenhoAtingido = niveisDesempenho[0];

    const titulo = nivelDesempenhoAtingido.title;
    const texto = nivelDesempenhoAtingido.text;
    const imagem = nivelDesempenhoAtingido.image;

    adicionaDesempenhoNoHtml(titulo, texto, imagem);
    scrollFimDoQuizz();
}

function analisarDesempenho(){
    const respostasCertas = desempenhoRespostas.filter( resposta => resposta == "true" );
    const totalRespondido = Number(desempenhoRespostas.length);

    const acertos = Number(respostasCertas.length);

    const desempenho = (acertos * 100) / totalRespondido;

    resultadoQuizz = Math.round(desempenho);

    verificaFimQuizz();

    const testeApagar = document.querySelector("body");
    console.log(testeApagar.innerHTML);
}

function scrollProximaPergunta(){
    const scrollPerguntas = document.querySelectorAll(".pergunta .imagens-respostas");
    for(let i = 0; i < scrollPerguntas.length; i++){
        let naoRespondido = !(scrollPerguntas[i].classList.contains("respondido"));
        if(naoRespondido){
            scrollPerguntas[i].parentNode.scrollIntoView({block: "end", behavior: "smooth"});
            return null;
        }
    }
}

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
        if(listaRespostas[j].classList[0] == "true"){
            listaRespostas[j].classList.add("certa");
        }else{
            listaRespostas[j].classList.add("errada");
        }
    }
    for(let j = 0; j < listaRespostas.length; j++){
        // se não contem a classe selecionada adiciona filtro
        if(!(listaRespostas[j].classList.contains("selecionada"))){
            listaRespostas[j].classList.add("resposta-nao-selecionada");
        }
    }

    setTimeout(scrollProximaPergunta, 500);

    analisarDesempenho();
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

    niveisDesempenho = quizzSelecionado.levels;
    console.log("NIVEIS DE DESEMPNHO DO QUIZZ SELECIONADO: ");
    console.log(quizzSelecionado.levels);
    

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
    console.log("SUCESSO AO OBTER QUIZZES");

    adicionaNoHtml();
}

function erroObterQuizzes(){
    console.log("ERRO AO OBTER QUIZZES");
}

function obterQuizzes(){

    // zerando desempenho respostas caso reinicio do quizz
    loadingAdd();

    const promise = axios.get(`${url}/quizzes`);
    promise.then(sucessoObterQuizzes);
    promise.catch(erroObterQuizzes);
}

function reiniciarQuizz (){
    desempenhoRespostas = [];
    const perguntasContainer = document.querySelector(".perguntas-container");
    console.log(perguntasContainer);
    perguntasContainer.innerHTML = "";

    obterQuizzes();
}

function loadingAdd(){
    const loadingGif = document.querySelector(".loading");
    loadingGif.classList.remove("escondido")

    setTimeout(loadingRemove, 2000);

}

function loadingRemove(){
    const loadingGif = document.querySelector(".loading");
    loadingGif.classList.add("escondido");
}


obterQuizzes();


