import { generateBuildingButtons, updateBuildingButtons, updateBuildingCounts } from "./buildings.js";
import { updateGoldCounter, updateStats, updateProgressBar } from "./ui.js"
import { startGame } from "./gameLoop.js";

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
document.getElementById('gold-button').addEventListener('click', () => {
  goldCount += goldPerClick;
  totalClicks++;
  progressClicks++;
  goldEarnedClicking += goldPerClick;
  totalGoldEarned += goldPerClick;
  exp += goldPerClick * 0.333;
  updateGoldCounter();
  updateStats();
  updateExpBar();
  updateProgressBar();
});

// Claim reward event
document.getElementById('claim-button').addEventListener('click', claimReward);

function claimReward() {
  const claimButton = document.getElementById('claim-button');
  const progressBar = document.getElementById('progress-bar');
  const rewardGold = goldPerSecond * 60;
  goldCount += rewardGold;
  totalGoldEarned += rewardGold;
  exp += rewardGold * 0.333;
  claimButton.style.display = 'none';
  progressBar.style.display = 'block';
  progressClicks = 0;
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
