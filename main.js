let dataStructure
function getData() {
  fetch('dataGame.json')
    .then(response => response.json())
    .then(data => dataStructure = data)
    .then(() => {
      // CREATE 
      createQuestion()
      createAnswersAndSetData()
      // CHANGE STATE 
      handleClickState()

      // RESTART
      restart()
      // IMAGE
      changeStepImage()
    })
}
getData()


const question = document.querySelector('.question')
const answers = document.querySelector('.answers')
const imgStep = document.querySelector('.imgStep')

let state = 0

function restart() {
  const restart = document.querySelector('.restart')
  restart.addEventListener('click', () => {
    deleteAnwers()
    state = 0
    changeStepImage()
    createQuestion()
    createAnswersAndSetData()
  })
}


function createQuestion(finishedMessage) {
  if (finishedMessage) {
    question.textContent = dataStructure[state].options.finished.becomeFinish
  }
  else {
    question.textContent = dataStructure[state].text
  }
}

function createAnswersAndSetData() {
  dataStructure[state].options.option.forEach(kas => {
    const li = document.createElement('li')
    answers.appendChild(li)
    li.textContent = kas.question
    li.setAttribute('data-next-id', `${kas.nextId}`)
  });
}

function deleteAnwers() {
  for (let index = 0; index < answers.children.length; index) {
    answers.removeChild(answers.children[index])
  }
}

function handleClickState() {
  answers.addEventListener('click', (e) => {
    let nextId = e.target.dataset.nextId


    if (nextId == undefined) {
      return
    }
    state = nextId
    changeStepImage()

    const finishedMessage = isFinisheOrNot()
    if (finishedMessage) {
      deleteAnwers()
      createQuestion(finishedMessage)
    }

    if (!finishedMessage) {
      deleteAnwers()
      createQuestion(finishedMessage)
      createAnswersAndSetData()
    }
  })

}

function isFinisheOrNot() {
  if (dataStructure[state].options.finished === undefined) {
    return false
  }

  if (dataStructure[state].options.finished.finish) {
    return true
  }
}

function tests() {
}


function changeStepImage() {
  const position = dataStructure[state].position
  imgStep.style.transform = `translate(${position.x}px, ${position.y}px)`
}
