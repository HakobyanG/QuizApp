class Question {
    constructor(question, options, correctAnswer, imageName) {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.imageName = imageName;
        this.userAnswer = null;
    }

    //էկրանն հարց պատասխաններով
    display() {
        return `
            <h2>${this.question}</h2>
            ${this.imageName ? `<img src="images/${this.imageName}" alt="Question Image">` : ''}
            <ul>
                ${this.options.map(option => `
                    <li onclick="questionSelected('${option}')">${option}</li>
                `).join('')}
            </ul>
        `;
    }

    setUserAnswer(answer) {
        this.userAnswer = answer;
    }
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer-container');
    timerDisplay.innerText = quiz.remainingTime;
}

class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.quizContainer = document.getElementById('quiz-container');
        this.timerInterval = null;
        this.timeLimitInSeconds = 20;
        this.remainingTime = this.timeLimitInSeconds;
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.remainingTime > 0) {
                this.remainingTime--;
                updateTimerDisplay();
            } else {
                this.stopTimer();
                this.checkAnswer();
                this.nextQuestion();
            }
        }, 1000);
      }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    displayQuestion() {
        const questionContainer = document.getElementById('question-container');
        questionContainer.innerHTML = this.questions[this.currentQuestionIndex].display();
        this.remainingTime = this.timeLimitInSeconds;
        this.startTimer();
    }

    //հաջորդ հարցը
    nextQuestion() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            this.displayQuestion();
        } else {
            this.stopTimer();
            this.showScore();
        }
    }

    //ընտրել պատասխանը
    checkAnswer() {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        if (currentQuestion.userAnswer === currentQuestion.correctAnswer) {
            this.score++;
        }
    }

    //ցույց տալ հաշիվը
    showScore() {
        const percentage = (this.score / this.questions.length) * 100;
        let message;
        const quizContainer = document.getElementById('quiz-container');

        if (percentage >= 90) {
            message = 'Շնորհավորում ենք! Դուք Հաղթեցիք!';
            quizContainer.style.backgroundColor = "green";
        } else {
            message = 'Դուք հավաքեցիք';
            quizContainer.style.backgroundColor = "red";
        }

        this.quizContainer.innerHTML = `
            <h1>${message}</h1>
            <p>Միավորներ: ${this.score}/${this.questions.length}</p>
            <p>Տոկոս: ${percentage.toFixed(2)}%</p>
            <div">
                <button id="restart-btn" onclick="resetQuiz()">Խաղալ Նորից</button>
            </div>
        `;
    }
}

//նկարել պատասխաններն ու ընտրել
function questionSelected(answer) {
    const currentQuestion = quiz.questions[quiz.currentQuestionIndex];
    currentQuestion.setUserAnswer(answer);

    const answerElements = document.querySelectorAll('#question-container ul li');
    answerElements.forEach(element => {
        element.classList.remove('selected');
        if (element.innerText === answer) {
            element.classList.add('selected');
        }
    });
}

//նորից սկսել
function resetQuiz() {
    quiz.currentQuestionIndex = 0;
    quiz.score = 0;
    quiz.questions.forEach(question => {
        question.setUserAnswer(null);
    });
    var confirm = window.confirm("Ցանկանու՞մ եք նորից խաղալ")
    if (confirm){
        window.location.reload();
    }
    
}

//օբյեկտներ իրենց հատկություններով
const quizQuestions = [
    new Question('Արեգակնային համակարգում Երկրի հարևաններն են․', ['Վեներա, Մարս', 'Մերկուրի, Մարս', 'Սատուռն, Ուրան', 'Սատուռն, Վեներա'], 'Վեներա, Մարս', 'planets.jpg'),
    new Question('Նշվածներից ո՞րը աշխարհի 7 հրաշալիքներից ՉԷ․', ['Թաջ Մահալ', 'Զևսի Արձան', 'Քեոփսի Բուրգ'], 'Թաջ Մահալ', 'tajmahal.jpg'),
    new Question('Ո՞ր թվականին է տեղի ունեցել մարդու առաջին թռիչքը դեպի Տիեզերք․', ['1921', '1960', '1961', '1940'], '1961', 'sky.jpg'),
    new Question('Ո՞ր դարն է 1300 թվականը․', ['12', '13', '14', 'Քարե'], '14', '14.jpg'),
    new Question('Նոտաների հերթականությունը Դո-ից մինչև հաջորդ Դո կոչվում է․', ['Ակորդ', 'Տերցիա', 'Օկտավա'], 'Օկտավա', 'oktava.jpg'),
    new Question('Ի՞նչն է ավելի արագ տարածվում:', ['Ձայնը', 'Ջերմությունը', 'Լույսը'], 'Լույսը', 'luys.jpg'),
    new Question('Ո՞ր քաղաքն են անվանում «Հավերժական քաղաք»', ['Վենետիկ', 'Լոնդոն', 'Փարիզ', 'Հռոմ'], 'Հռոմ', 'rome.jpg'),
    new Question('Ո՞վ է եղել ԱՄՆ-ի առաջին նախագահը.', ['Թոմաս Ջեֆերսոն', 'Ջոն Ադամս', 'Ջորջ Վաշինգտոն', 'Բենջամին Ֆրանկլին'], 'Ջորջ Վաշինգտոն', 'usa.jpg'),
    new Question('Ո՞րն է Աֆրիկայի ամենամեծ լիճը.', ['Չադ', 'Վիկտորիա', 'Մալավի', 'Տանգանիկա'], 'Վիկտորիա', 'viktorya.jpg'),
    new Question('Ինչպե՞ս է կոչվում գետը, որը հոսում է Փարիզով.', ['Թեմզա', 'Սենա', 'Ռեյն', 'Դանուբ'], 'Սենա', 'sena.jpg'),

];

const quiz = new Quiz(quizQuestions);

//նորից ծրագիրը բացվում ու տպում 
document.addEventListener('DOMContentLoaded', function () {
        const nextButton = document.getElementById('next-btn');
        nextButton.addEventListener('click', function () {
        quiz.stopTimer();
        quiz.checkAnswer(); // ընտրել պատասխանը
        if (quiz.currentQuestionIndex < quiz.questions.length - 1) {
            quiz.currentQuestionIndex++;
            quiz.displayQuestion();
        }else{
            quiz.showScore();// Վերջին հարցից հետո հաշիը
        }
    });

    quiz.displayQuestion(); // Առաջին հարցը
    
});
