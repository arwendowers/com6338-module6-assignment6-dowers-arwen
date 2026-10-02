var questionsArr = [
    {
        question: 'What shark is the largest fish in the world, growing up to 62 feet in length?',
        answer: 'Whale shark',
        options: [
            'Great white shark',
            'Basking shark',
            'Greenland shark',
            'Whale shark'
        ]
    },
    {
        question: 'What is the fastest shark in the world, reaching speeds of up to 46 mph?',
        answer: 'Shortfin mako shark',
        options: [
            'Thresher shark',
            'Shortfin mako shark',
            'Blue shark',
            'Great white shark'
        ]
    },
    {
        question: 'What shark is the longest living vertebrate, living up to 512 years old?',
        answer: 'Greenland shark',
        options: [
            'Frilled shark',
            'Whale shark',
            'Greenland shark',
            'Spiny dogfish shark'
        ]
    },
    {
        question: 'Which shark can survive without oxygen for up to an hour?',
        answer: 'Epaulette shark',
        options: [
            'Lanternshark',
            'Cookiecutter shark',
            'Epaulette shark',
            'Horn shark'
        ]
    },
    {
        question: 'Tens of thousands of which shark species migrates along the Florida coastline every winter, creating one of the largest coastal shark migrations in the world?',
        answer: 'Blacktip shark',
        options: [
            'Sandbar shark',
            'Hammerhead shark',
            'Tiger shark',
            'Blacktip shark'
        ]
    }
]

var quiz = document.getElementById('quiz')

var previousScore = localStorage.getItem('previous-score')
if (previousScore !== null) {
    var previousScoreEl = document.createElement('p')
    previousScoreEl.textContent = "Previous Score: " + previousScore + "%"
    quiz.appendChild(previousScoreEl)
}

var startQuizBtn = document.createElement('button')
startQuizBtn.textContent = "Start Quiz!"
startQuizBtn.id = "start-quiz"
quiz.appendChild(startQuizBtn)

var currentQuestion = 0
var correctAnswers = 0

function startTimer(timer) {
  var timerId = setInterval(function() {
    timer.textContent = Number(timer.textContent) - 1
    if (timer.textContent === '0') {
        clearInterval(timerId)
        nextQuestion()
    }
  }, 1000)
}

function displayQuestion() {
    // clears the previous question and start button
    quiz.innerHTML = ''

    var question = document.createElement('p')
    question.textContent = questionsArr[currentQuestion].question
    quiz.appendChild(question)

    var optionBtns = document.createElement('div')
    quiz.appendChild(optionBtns)

    for (i = 0; i < questionsArr[currentQuestion].options.length; i++) {
        var optionBtn = document.createElement('button')
        optionBtn.textContent = questionsArr[currentQuestion].options[i]
        optionBtns.appendChild(optionBtn)

        optionBtn.onclick = function() {
            if (this.textContent === questionsArr[currentQuestion].answer) {
                correctAnswers++
            }
            
            nextQuestion()
        }
    }

    var timer = document.createElement('p')
    timer.textContent = '30'
    quiz.appendChild(timer)

    startTimer(timer)
}

function nextQuestion() {
    currentQuestion++

    if (currentQuestion < questionsArr.length) {
        displayQuestion()
    } else {
        // clears the last question
        quiz.innerHTML = ''
        
        var previousScore = Math.floor((correctAnswers / questionsArr.length) * 100)
        
        localStorage.setItem('previous-score', previousScore)

        var previousScoreEl = document.createElement('p')
        previousScoreEl.textContent = "Previous Score: " + previousScore + "%"
        quiz.appendChild(previousScoreEl)
        
        // remake the start quiz button when the quiz is over
        var startQuizBtn = document.createElement('button')
        startQuizBtn.textContent = "Start Quiz!"
        startQuizBtn.id = "start-quiz"
        quiz.appendChild(startQuizBtn)

        startQuizBtn.onclick = function() {
            currentQuestion = 0
            correctAnswers = 0
            displayQuestion()
        }
    }
}

startQuizBtn.onclick = function() {
    currentQuestion = 0
    displayQuestion()
}