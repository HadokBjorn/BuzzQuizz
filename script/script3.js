const pageInfoBasic = document.getElementById('info-quizz-basic');
const pageQuestion = document.querySelector('.question-quizz');
const boxCardEditQuestion = document.getElementById("card-edit-question");
let objectQuestionsList = {
	title: "",
	image: "",
	questions: [],
	levels: [],
}

function isValidUrl(linkUrl){
    try {
        let url = new URL(linkUrl); 
        return true;
    } catch(err) {
        return false;
    };
}

function isValidQuizz(){
    const titleQuizz = document.getElementById('titulo-quizz').value;
    const urlQuizz = document.getElementById('url-quizz').value;
    const numberQuestions = Number(document.getElementById('number-questions').value);
    const levelQuizz = Number(document.getElementById('level-quizz').value);


    function isValidTitle(){
        if( titleQuizz.length >= 20 && titleQuizz.length <= 65 ){
            return true;
        }
        if(titleQuizz.length < 20 && titleQuizz.length !== 0){
            alert('Titulo muito curto!')
            return false
        }
        if(titleQuizz.length > 65){
            alert('Titulo muito longo')
            return false;
        }
    }

    function isValidNumberQuestion(){
        if (numberQuestions >= 3){
            return true;
        }
        if (numberQuestions < 3 && numberQuestions !== 0){
            alert('A menor quantidade de perguntas é 3')
            return false;
        }
    }

    function isValidLevel(){
        if (levelQuizz >= 2){
            return true;
        }
        if(levelQuizz < 2 && levelQuizz !== 0){
            alert('O nível minimo é 2')
            return false;
        }
    }
        

    function isEveryNull(){

        const validTitle = isValidTitle();
        const validUrl = isValidUrl(urlQuizz);
        const validNumberQuestion = isValidNumberQuestion();
        const validLevel = isValidLevel();
        
        if(titleQuizz === '' || urlQuizz === '' || numberQuestions === 0 || levelQuizz === 0){
            alert('Todos os campos devem ser preenchidos');
        }

        if(validUrl === false && urlQuizz !== ''){
            alert('Url inválida');
        }
        
        if(validTitle && validUrl && validNumberQuestion && validLevel ){
            objectQuestionsList.title = titleQuizz
            objectQuestionsList.image = urlQuizz;
            pageInfoBasic.style.display = "none";
            pageQuestion.style.display = "flex";
            addCardQuestion(numberQuestions);
            
        }
    }

    isEveryNull()
    
}

function addCardQuestion(quantidadeQuestions){
    let questionToRenderizar = ``;
    for (let i=1; i<=(quantidadeQuestions-1); i++){
        questionToRenderizar += `
        <div class="card-fechado">
            <p>Pergunta ${i+1}</p>
            <img src="../assets/editor-icon.png" onclick="openQuestion(this,${i+1})"/>
        </div>
        `
    }
    boxCardEditQuestion.innerHTML += questionToRenderizar;
}

function openQuestion(cardQuestion, question){
    const divQuestion = cardQuestion.parentNode;

    divQuestion.classList.add("selected");    
    divQuestion.style.height = 'auto';
    divQuestion.innerHTML += `
    <section class="question-quizz">
        <main class="main-question-quizz">
            <div id="question${question}">
                <p>Pergunta ${question}</p>
                <input id="text-question${question}" placeholder="Texto da pergunta" type="text"/>
                <input id="color-question${question}" placeholder="Cor de fundo da pergunta" type="url"/>
            </div>
            <div id="answer-question${question}">
                <p>Resposta correta</p>
                <input class="answer-question${question}" placeholder="Resposta correta" type="text"/>
                <input class="url-question${question}" placeholder="URL da imagem" type="url"/>
            </div>
            <div id="answer-incorrect-question${question}">
                <p>Respostas incorretas</p>
                <input class="answer-question${question}" placeholder="Resposta incorreta 1" type="text"/>
                <input class="url-question${question}" placeholder="URL da imagem 1" type="url"/>
            </div>
            <div id="answer-incorrect-question${question}">
                <input class="answer-question${question}" placeholder="Resposta incorreta 2" type="text"/>
                <input class="url-question${question}" placeholder="URL da imagem 2" type="url"/>
            </div>
            <div id="answer-incorrect-question1">
                <input class="answer-question${question}" placeholder="Resposta incorreta 3" type="text"/>
                <input class="url-question${question}" placeholder="URL da imagem 3" type="url"/>
            </div>
        </main>
    </section>
    `;
    divQuestion.children[0].style.display = 'none';
    divQuestion.children[1].style.display = 'none';
    divQuestion.children[2].style.display = 'flex';
}

function questionSize(question){
    if(question.length <=20) {
        return false;
    }else{
        return true;
    }
}
//deve conter 7 caracteres incluindo #. deve ter # no inicio e começar com 0;
//^#\d{6}$

function addHashQuestion(selectQuestions){
    for(let i = 0; i < selectQuestions.length; i++) {

        let question = {};
        let repostaCorreta = selectQuestions[0].children[1].children[1].value;
        let repostaErrada1 = selectQuestions[0].children[2].children[1].value;

        let repostaErrada3 = '';
        let repostaErrada4 = '';
        let color = '';
    
        if(i === 0){
        
            color = selectQuestions[i].children[0].children[2].value;

            if(/^#\d{6}$/.test(color)){
                
                    if(repostaCorreta !== '' && repostaErrada1 !== ''){

                    question = {
                        title: selectQuestions[i].children[0].children[1].value,
                        color: selectQuestions[i].children[0].children[2].value,
                        answers: [
                            {
                                text: selectQuestions[i].children[1].children[1].value,
                                image: selectQuestions[i].children[1].children[2].value,
                                isCorrectAnswer: true
                            },
                            {
                                text: selectQuestions[i].children[2].children[1].value,
                                image: selectQuestions[i].children[2].children[2].value,
                                isCorrectAnswer: false
                            },
                        ]
                    };
                    objectQuestionsList.questions.push(question);
        
                    repostaErrada3 = selectQuestions[i].children[3].children[0].value;
                    repostaErrada4 = selectQuestions[i].children[4].children[0].value;
        
                    if(repostaErrada3 !== ''){
                        question.answers.push({
                            text: selectQuestions[i].children[3].children[0].value,
                            image: selectQuestions[i].children[3].children[1].value,
                            isCorrectAnswer: false
                        });
                    }
                    if(repostaErrada4 !== ''){
                        question.answers.push({
                            text: selectQuestions[i].children[4].children[0].value,
                            image: selectQuestions[i].children[4].children[1].value,
                            isCorrectAnswer: false
                        });
                    }
                }else{
                    alert('Deve haver uma resposta correta e pelo menos uma resposta incorreta')
                }
            }else{
                alert(`A cor da pergunta ${i+1} deve ter o formato hexadecimal`)
            }
        }else{
            color = selectQuestions[i].children[2].children[0].children[0].children[2].value;
            repostaCorreta = selectQuestions[i].children[2].children[0].children[1].children[1].value;
            repostaErrada1 = selectQuestions[i].children[2].children[0].children[2].children[1].value;

            

            if(/^#\d{6}$/.test(color)){

                if(repostaCorreta !== '' && repostaErrada1 !== ''){

                    question = {
                        title: selectQuestions[i].children[2].children[0].children[0].children[1].value,
                        color: selectQuestions[i].children[2].children[0].children[0].children[2].value,
                        answers: [
                            {
                                text: selectQuestions[i].children[2].children[0].children[1].children[1].value,
                                image: selectQuestions[i].children[2].children[0].children[1].children[2].value,
                                isCorrectAnswer: true
                            },                
                            {
                                text: selectQuestions[i].children[2].children[0].children[2].children[1].value,
                                image: selectQuestions[i].children[2].children[0].children[2].children[2].value,
                                isCorrectAnswer: false
                            },
                        ]};
                    objectQuestionsList.questions.push(question);
        
                    repostaErrada3 = selectQuestions[i].children[2].children[0].children[3].children[0].value;
                    repostaErrada4 = selectQuestions[i].children[2].children[0].children[4].children[0].value;
        
                    if(repostaErrada3 !== ''){
                        question.answers.push({
                            text: selectQuestions[i].children[2].children[0].children[3].children[0].value,
                            image: selectQuestions[i].children[2].children[0].children[3].children[1].value,
                            isCorrectAnswer: false
                        });
                    };
        
                    if(repostaErrada4 !== ''){
                        question.answers.push({
                            text: selectQuestions[i].children[2].children[0].children[4].children[0].value,
                            image: selectQuestions[i].children[2].children[0].children[4].children[1].value,
                            isCorrectAnswer: false
                        });
                    };
                }else{
                    alert('Deve haver uma resposta correta e pelo menos uma resposta incorreta')
                }
            }else{
                alert(`A cor da pergunta ${i+1} deve ter o formato hexadecimal`)
            }
        }
    }
}

function sendQuestion(){
    const allQuestions = document.querySelectorAll('.card-fechado').length + 1;
    const selectQuestions = document.querySelectorAll('.selected');
    //const selectInputs = document.querySelectorAll('.selected input');

    if(selectQuestions.length === allQuestions) {
        addHashQuestion(selectQuestions)
    }
    console.log(objectQuestionsList);
}