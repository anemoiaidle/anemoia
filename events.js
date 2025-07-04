import { generateBuildingButtons, updateBuildingButtons, updateBuildingCounts } from "./buildings.js";
import { updateGoldCounter, updateStats, updateProgressBar } from "./ui.js"
import { startGame } from "./gameLoop.js";
import { getGoldCount, setGoldCount, getGoldPerClick, incrementTotalClicks, incrementProgressClicks, setProgressClicks, getGoldEarnedClicking, setGoldEarnedClicking, getTotalGoldEarned, setTotalGoldEarned, getGoldPerSecond } from "./gameState.js";
import { purchaseUpgrade } from "./upgrades.js"

// events.js

// Panel toggle events
document.getElementById('equipment-button').addEventListener('click', () => togglePanel('equipment-panel'));
document.getElementById('inventory-button').addEventListener('click', () => togglePanel('inventory-panel'));

document.addEventListener('keydown', function(event) {
  if (event.key.toLowerCase() === 'e') {
    togglePanel('equipment-panel');
  } else if (event.key.toLowerCase() === 'i') {
    togglePanel('inventory-panel');
  } else if (event.key === 'Escape') {
    if (activePanel) {
      activePanel.classList.remove('active');
      activePanel = null;
    }
  }
});

// Gold button click event
const goldButton = document.getElementById('gold-button');
goldButton.addEventListener('click', (e) => {
  const newGoldCount = getGoldCount() + getGoldPerClick();
  setGoldCount(newGoldCount)

  incrementTotalClicks();
  incrementProgressClicks();
  
  const newGoldEarnedClicking = getGoldEarnedClicking() + getGoldPerClick();
  setGoldEarnedClicking(newGoldEarnedClicking);

  const newTotalGoldEarned = getTotalGoldEarned() + getGoldPerClick();
  setTotalGoldEarned(newTotalGoldEarned);
  exp += getGoldPerClick() * 0.333;
  updateGoldCounter();
  updateStats();
  updateExpBar();
  updateProgressBar();

  const floatText = document.createElement('span');
  floatText.textContent = `+${getGoldPerClick()}`;
  floatText.className = 'floating-plus';
  floatText.style.left = `${e.pageX + 5}px`;
  floatText.style.top = `${e.pageY - 20}px`;
  document.body.appendChild(floatText);

  setTimeout(() => {
    floatText.remove();
  }, 1000);

  goldButton.classList.add('gold-button-press');
  setTimeout(() => {
    goldButton.classList.remove('gold-button-press');
  }, 200);
});

// Claim reward event
document.getElementById('claim-button').addEventListener('click', claimReward);

function claimReward() {
  const claimButton = document.getElementById('claim-button');
  const progressBar = document.getElementById('progress-bar');
  const rewardGold = getGoldPerSecond() * 60;
  const currentGoldCount = getGoldCount() + rewardGold;
  setGoldCount(currentGoldCount);

  const currentTotalCount = getTotalGoldEarned() + rewardGold;
  setTotalGoldEarned(currentTotalCount)
  exp += rewardGold * 0.333;
  claimButton.style.display = 'none';
  progressBar.style.display = 'block';
  setProgressClicks(0);
  updateGoldCounter();
  updateStats();
  updateExpBar();
  updateProgressBar();
}

// Upgrade button events
document.getElementById('increase-settlershack-income').addEventListener('click', () => purchaseUpgrade('increase-settlershack-income'));
document.getElementById('increase-total-income').addEventListener('click', () => purchaseUpgrade('increase-total-income'));
document.getElementById('double-lumberyard-income').addEventListener('click', () => purchaseUpgrade('double-lumberyard-income'));
document.getElementById('increase-settlershack-income-one').addEventListener('click', () => purchaseUpgrade('increase-settlershack-income-one'));
document.getElementById('increase-settlershack-income-one-two').addEventListener('click', () => purchaseUpgrade('increase-settlershack-income-one-two'));
document.getElementById('increase-settlershack-income-ten').addEventListener('click', () => purchaseUpgrade('increase-settlershack-income-ten'));
document.getElementById('increase-total-income-settlershack-upgrade').addEventListener('click', () => purchaseUpgrade('increase-total-income-settlershack-upgrade'));

// IMPORTANT: Initialize everything once the DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  generateBuildingButtons();
  updateBuildingButtons();
  updateBuildingCounts();
  updateGoldCounter();
  updateStats();
  updateProgressBar();
  updateExpBar();
  startGame(); // Start the main game loop
});
