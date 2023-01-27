/* - Informações básicas do quizz
    Título do quizz: deve ter no mínimo 20 e no máximo 65 caracteres.
    URL da Imagem: deve ter formato de URL.
    Quantidade de perguntas: no mínimo 3 perguntas.
    Quantidade de níveis: no mínimo 2 níveis. */


function isValidQuizz(){
    const titleQuizz = document.getElementById('titulo-quizz').value;
    const urlQuizz = document.getElementById('url-quizz').value;
    const numberQuestions = Number(document.getElementById('number-questions').value);
    const levelQuizz = Number(document.getElementById('level-quizz').value);


    function isValidTitle(){
        if( titleQuizz.length >= 20 && titleQuizz.length <= 65 ){
            return true;
        }
        if(titleQuizz.length < 20){
            alert('Titulo muito curto!')
            return false
        }
        if(titleQuizz.length > 65){
            alert('Titulo muito longo')
            return false;
        }
    }

    function isValidUrl(){
        try {
            let url = new URL(urlQuizz);
            return true;
        } catch(err) {
            return false;
        };
    }

    function isValidNumberQuestion(){
        if (numberQuestions >= 3){
            console.log('é 3 ou maior')
            return true;
        }
        if (numberQuestions < 3){
            alert('A menor quantidade de perguntas é 3')
            return false;
        }
    }

    function isValidLevel(){
        if (levelQuizz >= 2){
            console.log('Nivel aceitavel')
            return true;
        }
        if(levelQuizz < 2){
            alert('O nível minimo é 2')
            return false;
        }
    }
        

    function isEveryNull(){

        const validTitle = isValidTitle();
        const validUrl = isValidUrl();
        console.log(validUrl)
        const validNumberQuestion = isValidNumberQuestion();
        const validLevel = isValidLevel();
        
        if(titleQuizz === '' && urlQuizz === '' && numberQuestions === 0 && levelQuizz === 0){
            console.log('tudo vazio');
        }
        if(titleQuizz === '' || urlQuizz === '' || numberQuestions === 0 || levelQuizz === 0){
            alert('Todos os campos devem ser preenchidos');
        }
        if(validUrl === false){
            alert('Url inválida');
        }
        if(validTitle && validUrl && validNumberQuestion && validLevel ){
            console.log("tudo ok");
        }
        if(validTitle === false || validUrl === false || validNumberQuestion === false || validLevel === false){
            console.log("Alguem não esta certo");
        }
    }

    isEveryNull()
    
}