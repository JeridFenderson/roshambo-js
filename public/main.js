let player1Choice = ''
let player2Choice = ''
let player1Name = 'Player 1'
let player2Name = 'Player 2'
let player1Wins = 0
let player2Wins = 0
let roundCounter = 1
let isComputer = false

const headerBanner = document.querySelector('header h1')
const footerBanner = document.querySelector('footer h2')

function player1NameChange() {
  player1Name = document.querySelector(
    '#player1Name'
  ).textContent = document.querySelector('#player1NameChanger').value
}
function player2NameChange() {
  player2Name = document.querySelector(
    '#player2Name'
  ).textContent = document.querySelector('#player2NameChanger').value
}

function handleClick(event) {
  if (event.target.nodeName !== 'I') return

  const playerClick = event.target.className.split(' ')
  const playerIdentifier = playerClick[0]
  const playerMove = playerClick[2]

  if (player1Choice !== '' && player2Choice !== '') {
    headerBanner.textContent = 'This round has already been played!'
    footerBanner.textContent = 'Clear your hands before playing again'
    return
  }
  if (
    player1Choice !== '' &&
    playerIdentifier === 'fas' &&
    player2Choice === ''
  ) {
    headerBanner.textContent = 'We might have a cheater in our midst...'
    footerBanner.textContent = `${player1Name} has already made a move!`
  }
  if (player1Choice === '' && playerIdentifier === 'fas') {
    player1Choice = playerMove
    footerBanner.textContent = `${player1Name} has successfully shot. It's ${player2Name}'s turn now`
  }
  if (player1Choice === '' && playerIdentifier === 'far') {
    footerBanner.textContent = `${player1Name} must shoot first!`
    return
  }
  if (
    player1Choice !== '' &&
    player2Choice === '' &&
    playerIdentifier === 'far'
  ) {
    player2Choice = playerMove
    evaluateWinner()
  }
  if (isComputer) {
    const shoot = Math.floor(Math.random() * 6 + 1)
    switch (shoot) {
      case 1:
        player2Choice = 'rock'
        break
      case 2:
        player2Choice = 'paper'
        break
      case 3:
        player2Choice = 'scissors'
        break
      case 4:
        player2Choice = 'lizard'
        break
      case 5:
        player2Choice = 'spock'
        break
      default:
        player2Choice = 'rock'
        break
    }
    evaluateWinner()
  }
}
function evaluateWinner() {
  roundCounter++
  if (player1Choice === player2Choice) {
    headerBanner.textContent = `You tied! This isn't a ${player1Choice} fight!`
    footerBanner.textContent = 'No winners to be found here'
    return
  }

  // Scissors cuts Paper
  // Scissors decapitates Lizard
  // Paper covers Rock
  // Paper disproves Spock
  // Rock crushes Scissors
  // Rock crushes Lizard
  // Lizard poisons Spock
  // Lizard eats Paper
  // Spock smashes Scissors
  // Spock vaporizes Rock

  const beats = /scissorspaper|scissorslizard|paperrock|paperspock|rockscissors|rocklizard|lizardspock|lizardpaper|spockscissors|spockrock/
  if (beats.test(player1Choice + player2Choice)) {
    player1Wins++
    document.querySelector('#player1Wins').textContent = `Wins: ${player1Wins}`
    headerBanner.textContent = `${player1Name} Wins!`
    footerBanner.textContent = `${player1Name} beat ${player2Name}'s ${player2Choice} with ${player1Choice}`
  } else {
    player2Wins++
    document.querySelector('#player2Wins').textContent = `Wins: ${player2Wins}`
    headerBanner.textContent = `${player2Name} Wins!`
    footerBanner.textContent = `${player2Name} beat ${player1Name}'s ${player1Choice} with ${player2Choice}`
  }
}

function clearHand() {
  player1Choice = ''
  player2Choice = ''
  headerBanner.textContent = `Roshambo! Round ${roundCounter}`
  footerBanner.textContent = `Make a move, ${player1Name}...`
}

function convertComputer(event) {
  event.target.classList.toggle('is-computer')
  if (isComputer) {
    isComputer = false
    player2Name = document.querySelector('#player2Name').textContent =
      'Player 2'
    document.querySelector('#player2NameChanger').style.display = 'block'
    document.querySelector('#player2Wins').style.marginBottom = ''
  } else {
    isComputer = true
    player2Name = document.querySelector('#player2Name').textContent =
      'The Computer'
    document.querySelector('#player2NameChanger').style.display = 'none'
    document.querySelector('#player2Wins').style.marginBottom = '2em'
  }
}

function main() {
  document
    .querySelector('#player1NameChanger')
    .addEventListener('keyup', player1NameChange)
  document
    .querySelector('#player2NameChanger')
    .addEventListener('keyup', player2NameChange)

  document
    .querySelector('main section button')
    .addEventListener('click', convertComputer)

  document.querySelector('main').addEventListener('click', handleClick)

  document.querySelector('#clear').addEventListener('click', clearHand)

  document
    .querySelector('#reset')
    .addEventListener('click', () => location.reload())
}

document.addEventListener('DOMContentLoaded', main)
