let gameContainer = JSON.parse(localStorage.getItem('myGameContainer')) ||
['','','',
'','','',
'','',''
];

const score = JSON.parse(localStorage.getItem('myTicTacToeScore')) || {
  wins: 0,
  losses: 0
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const buttonZero = document.querySelector('.js-button-0');
const buttonOne = document.querySelector('.js-button-1');
const buttonTwo = document.querySelector('.js-button-2');
const buttonThree = document.querySelector('.js-button-3');
const buttonFour = document.querySelector('.js-button-4');
const buttonFive = document.querySelector('.js-button-5');
const buttonSix = document.querySelector('.js-button-6');
const buttonSeven = document.querySelector('.js-button-7');
const buttonEight = document.querySelector('.js-button-8');

buttonZero.addEventListener('click', () => {
  playGame(0);
});
buttonOne.addEventListener('click', () => {
  playGame(1);
});
buttonTwo.addEventListener('click', () => {
  playGame(2);
});
buttonThree.addEventListener('click', () => {
  playGame(3);
});
buttonFour.addEventListener('click', () => {
  playGame(4);
});
buttonFive.addEventListener('click', () => {
  playGame(5);
});
buttonSix.addEventListener('click', () => {
  playGame(6);
});
buttonSeven.addEventListener('click', () => {
  playGame(7);
});
buttonEight.addEventListener('click', () => {
  playGame(8);
});

document.querySelector('.js-reset-game')
  .addEventListener('click', () => {
    resetGame();
  });
document.querySelector('.js-reset-score')
  .addEventListener('click', () => {
    resetScore();
  });


function playGame(num) {
  if (gameContainer[num] === '') {
    gameContainer[num] = 'X';
    localStorage.setItem('myGameContainer', JSON.stringify(gameContainer));
    console.log(gameContainer);
    computerPick(gameContainer);
    renderGameContainer();
    checkWinner();
  }
}

function computerPick(array) {
  let track = true;
  let tryNum = 0
  while(track) {
    const randomNumber = getRandomNumber(0,8);
    for (let i = 0; i < gameContainer.length; i++) {
      if(gameContainer[i]) {
        tryNum++;
      }
    }
    if(gameContainer.every(element => element !== '') || tryNum === 8){
      track = false;
    }
    if(!array[randomNumber]){
      gameContainer[randomNumber] = 'O'; 
      track = false;
    }
  }
  localStorage.setItem('myGameContainer', JSON.stringify(gameContainer));
  console.log(gameContainer);
}

function renderGameContainer () {
  gameContainer.forEach((value, index) => {
    document.querySelector(`.js-button-${index}`)
      .innerHTML = gameContainer[index];
    
    document.querySelector(`.js-button-${index}`).classList.remove('blue');
    document.querySelector(`.js-button-${index}`).classList.remove('yellow');
    
    
    if (gameContainer[index] === 'X') {
      document.querySelector(`.js-button-${index}`).classList.add('blue');
    }
    else if (gameContainer[index] === 'O'){
      document.querySelector(`.js-button-${index}`).classList.add('yellow');
    }
  });
}
renderGameContainer();

function updateScoreElement() {
  document.querySelector('.js-wins')
    .innerHTML = score.wins;
  document.querySelector('.js-losses')
    .innerHTML = score.losses;
}
updateScoreElement();

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  localStorage.setItem('myTicTacToeScore', JSON.stringify(score));
  updateScoreElement();
}

function resetGame() {
  gameContainer[0] = '';
  gameContainer[1] = '';
  gameContainer[2] = '';
  gameContainer[3] = '';
  gameContainer[4] = '';
  gameContainer[5] = '';
  gameContainer[6] = '';
  gameContainer[7] = '';
  gameContainer[8] = '';
  localStorage.setItem('myGameContainer', JSON.stringify(gameContainer));
  renderGameContainer();
}

function checkWinner () {
  const win = gameContainer[0] + gameContainer[1] + gameContainer[2];
  const win1 = gameContainer[0] + gameContainer[4] + gameContainer[8];
  const win2 = gameContainer[0] + gameContainer[3] + gameContainer[6];
  const win3 = gameContainer[1] + gameContainer[4] + gameContainer[7];
  const win4 = gameContainer[2] + gameContainer[5] + gameContainer[8];
  const win5 = gameContainer[2] + gameContainer[4] + gameContainer[6];
  const win6 = gameContainer[3] + gameContainer[4] + gameContainer[5];
  const win7 = gameContainer[6] + gameContainer[7] + gameContainer[8];

  const statusElement = document.querySelector('.status');
  
  if (win === 'XXX' || win1 === 'XXX' || win2 === 'XXX' || win3 === 'XXX' || win4 === 'XXX' || win5 === 'XXX' ||win6 === 'XXX' || win7 === 'XXX') {
    console.log('You Win');
    score.wins += 1;
    updateScoreElement();
    statusElement.innerHTML = `<div class="winner">
                                  <div class="winner-container win">
                                    You Win!
                                  </div>
                                </div>`;
    setTimeout (() => {
      statusElement.innerHTML = '';
    },2000);
    setTimeout (() => {
      resetGame();
    },2000);
  }
  else if (win === 'OOO' || win1 === 'OOO' || win2 === 'OOO' || win3 === 'OOO' || win4 === 'OOO' || win5 === 'OOO' ||win6 === 'OOO' || win7 === 'OOO') {
    console.log('Computer Win');
    score.losses += 1;
    updateScoreElement();
    statusElement.innerHTML = `<div class="winner">
                                  <div class="winner-container lose">
                                    Computer Win!
                                  </div>
                                </div>`;

    setTimeout (() => {
      statusElement.innerHTML = '';
    },2000);

    setTimeout (() => {
      resetGame();
    },2000);
  }
  else {
    console.log('Draw');
    if (gameContainer.every(element => element !== '')){
      statusElement.innerHTML = `<div class="winner">
                                  <div class="winner-container tie">
                                    Draw!
                                  </div>
                                </div>`;
      setTimeout (() => {
        statusElement.innerHTML = '';
      },2000);
      setTimeout (() => {
        resetGame();
      },2000);
    }
  }
  localStorage.setItem('myTicTacToeScore', JSON.stringify(score));
}