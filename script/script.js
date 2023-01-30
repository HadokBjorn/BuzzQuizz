const url = "https://mock-api.driven.com.br/api/v4/buzzquizz";

const backgroundImg = 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%)';

let cardId = 0;

function mudarImagem (urlImg, id){
    console.log(urlImg + " " + id);
    const imagemCss = document.getElementById(`${id}`);
    const novaImg = `url('${urlImg}')`;
    // mudar background e imagem
    const novoBackground = `${backgroundImg}, ${novaImg}`;
    imagemCss.style.backgroundImage = novoBackground;
}

function exibirQuizzHtml (quizz){

    const dom = document.querySelector("main");

    const texto = quizz.title;
    const id = quizz.id;

    const urlImg = quizz.image;
    
    const template = `<a href="./pages/page2.html#${id}">
                        <li class="card" id="${id}">
                            <p>${texto}</p>
                        </li>
                    </a>`;

    dom.innerHTML += template;

    mudarImagem(urlImg, id);
}

function sucessoObterQuizzes(callback){
    loadingAdd();
    const quizzes = callback.data;

    console.log(quizzes);

    quizzes.forEach(exibirQuizzHtml);
}

function erroObterQuizzes(){
    console.log("ERRO AO OBTER QUIZZES");
}

function obterQuizzes(){

    const promise = axios.get(`${url}/quizzes`);
    promise.then(sucessoObterQuizzes);
    promise.catch(erroObterQuizzes);
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


// export default cardId;
// tentando resolver bug imagem ampliada
