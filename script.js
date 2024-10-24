// Initial player stats
let ironmanHealth = 100;
let thorHealth = 100;

// Selecting the HTML elements
const ironmanHealthElement = document.getElementById('ironman-health');
const thorHealthElement = document.getElementById('thor-health');
const ironmanScoreElement = document.getElementById('ironman-score');
const thorScoreElement = document.getElementById('thor-score');

// Selecting the video elements
const fireVideo = document.getElementById('fire-video');
const thunderVideo = document.getElementById('thunder-video');

// Selecting the attack button and winner message
const attackButton = document.getElementById('attack-button');
const winnerMessage = document.createElement('div');
winnerMessage.id = 'winner-message';
document.body.appendChild(winnerMessage);

// Confetti settings
const confettiSettings = { target: 'confetti-canvas' };
let confetti;

// Function to generate random damage
function getRandomDamage() {
  return Math.floor(Math.random() * 20) + 1;
}

// Function to play the effect and handle video fade in/out
function playEffect(video) {
  video.pause();
  video.currentTime = 0;
  video.play();
  video.style.opacity = 1;
  setTimeout(() => {
    video.style.opacity = 0;
  }, 1000);
}

// Function to display confetti and winner message
function declareWinner(winner) {
  // Display winner message
  winnerMessage.textContent = `${winner} Wins!`;
  winnerMessage.style.display = 'block';

  // Play confetti
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  canvas.className = 'confetti';
  document.body.appendChild(canvas);
  confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();

  // Disable the attack button after winner is declared
  attackButton.disabled = true;
  attackButton.textContent = "Game Over";

  // Stop confetti and reset game after 3 seconds
  setTimeout(resetGame, 3000);
}

// Function to reset the game
function resetGame() {
  // Clear confetti
  stopConfetti();

  // Reset health and scores
  ironmanHealth = 100;
  thorHealth = 100;
  ironmanHealthElement.textContent = `Health: ${ironmanHealth}`;
  thorHealthElement.textContent = `Health: ${thorHealth}`;
  ironmanScoreElement.textContent = `Attack Power: 0`;
  thorScoreElement.textContent = `Attack Power: 0`;

  // Hide the winner message
  winnerMessage.style.display = 'none';

  // Enable the attack button
  attackButton.disabled = false;
  attackButton.textContent = "Attack!";
}

// Attack event listener
attackButton.addEventListener('click', function() {
  // Generate random damage for both players
  const ironmanDamage = getRandomDamage();
  const thorDamage = getRandomDamage();

  // Update health and scores
  ironmanHealth -= thorDamage;
  thorHealth -= ironmanDamage;

  // Ensure health doesn't go below 0
  ironmanHealth = Math.max(0, ironmanHealth);
  thorHealth = Math.max(0, thorHealth);

  // Update the UI
  ironmanHealthElement.textContent = `Health: ${ironmanHealth}`;
  thorHealthElement.textContent = `Health: ${thorHealth}`;
  ironmanScoreElement.textContent = `Attack Power: ${ironmanDamage}`;
  thorScoreElement.textContent = `Attack Power: ${thorDamage}`;

  // Play random effect
  if (ironmanDamage > thorDamage) {
    playEffect(fireVideo);
  } else {
    playEffect(thunderVideo);
  }

  // Check if anyone's health reaches 0 and declare the winner
  if (ironmanHealth <= 0) {
    declareWinner('Thor');
  } else if (thorHealth <= 0) {
    declareWinner('Iron Man');
  }
});

// Clean up confetti after a while
function stopConfetti() {
  if (confetti) {
    confetti.clear();
  }
  const canvas = document.getElementById('confetti-canvas');
  if (canvas) {
    canvas.remove();
  }
}
