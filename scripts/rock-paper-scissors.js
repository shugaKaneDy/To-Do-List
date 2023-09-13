let score = JSON.parse(localStorage.getItem('myScore')) || {
  wins: 0,
  losses: 0,
  ties: 0
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerPick;
  if(randomNumber > 0 && randomNumber < 1/3) {
    computerPick = 'Rock';
  }
  else if(randomNumber >= 1/3 && randomNumber < 2/3) {
    computerPick = 'Paper';
  }
  else if(randomNumber >= 2/3 && randomNumber < 1) {
    computerPick = 'Scissors';
  }
  return computerPick;
}

function playGame(playerMove) {
  const computerPick = pickComputerMove();
  let result = '';
  let yourClassResult = '';
  let computerClassResult = '';

  if (playerMove === 'Rock') {
    if (computerPick === 'Rock') {
      result = 'Tie.';
    }
    else if (computerPick === 'Paper') {
      result = 'You Lose.'
    }
    else if (computerPick === 'Scissors') {
      result = 'You Win.'
    }
  }

  else if(playerMove === 'Paper') {
    if (computerPick === 'Rock') {
      result = 'You Win.';
    }
    else if (computerPick === 'Paper') {
      result = 'Tie.'
    }
    else if (computerPick === 'Scissors') {
      result = 'You Lose.'
    }
  }

  else if(playerMove === 'Scissors') {
    if (computerPick === 'Rock') {
      result = 'You Lose.';
    }
    else if (computerPick === 'Paper') {
      result = 'You Win.'
    }
    else if (computerPick === 'Scissors') {
      result = 'Tie.'
    }
  }

  if(result === 'You Win.') {
    score.wins++;
    yourClassResult = 'win';
    computerClassResult = 'lose';
  }
  else if(result === 'You Lose.') {
    score.losses++;
    yourClassResult = 'lose';
    computerClassResult = 'win';
  }
  else if(result === 'Tie.') {
    score.ties++;
    yourClassResult = 'tie';
    computerClassResult = 'tie';
  }

  localStorage.setItem('myScore', JSON.stringify(score));
  updateScoreElement();

  document.querySelector('.js-game-match')
    .innerHTML = `
    <div class="you">
      <p class="game-match-text">You.</p>
      <div class="with-animation">
        <img class="match-img you-img js-${yourClassResult}-image" src="images/${playerMove}-no-bg.png" alt="">
      </div>
      <p class="normal-text">${playerMove}</p>
    </div>
    <p class="result js-match-${yourClassResult}-result">${result}</p>
    <div class="computer">
      <p class="game-match-text">Computer.</p>
      <img class="match-img computer-img js-${computerClassResult}-image" src="images/${computerPick}-no-bg.png" alt="">
      <p class="normal-text">${computerPick}</p>
    </div>`;
}

let isAutoPlayiing = false;
let intervalId;

function autoPlay() {
  if(!isAutoPlayiing) {
    intervalId = setInterval(() => {
      const playerMove  = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlayiing = true;
  }
  else {
    clearInterval(intervalId);
    isAutoPlayiing = false;
  }
}

function updateScoreElement() {
  document.querySelector('.js-wins-score')
    .innerHTML = score.wins;
  document.querySelector('.js-losses-score')
    .innerHTML = score.losses;
  document.querySelector('.js-ties-score')
    .innerHTML = 
    score.ties;
}

updateScoreElement();

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('Rock');
  });
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('Paper');
  });
document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('Scissors');
  });

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem('myScore');
    updateScoreElement();
  });

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    const autoPlayButton = document.querySelector('.js-auto-play-button');


    autoPlayButton.classList.toggle('auto-play-button-active');

    if(autoPlayButton.classList.contains('auto-play-button-active'))
    {
      autoPlayButton.innerHTML = 'Auto Playing...';
    }
    else
    {
      autoPlayButton.innerHTML = 'Auto Play';
    }
    autoPlay();
  });
