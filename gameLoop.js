// gameLoop.js
function gameLoop() {
    let now = Date.now();
    let delta = (now - lastUpdate) / 1000;
    lastUpdate = now;
  
    const generatedGold = goldPerSecond * delta;
    goldCount += generatedGold;
    totalGoldEarned += generatedGold;
  
    // Generate EXP from passive gold
    exp += generatedGold * 0.01;
  
    updateGoldCounter();
    updateExpBar();
    updateStats();
    updateProgressBar();
  
    if (!isHidden) {
      requestAnimationFrame(gameLoop);
    }
  }
  
  function startBackgroundInterval() {
    backgroundInterval = setInterval(() => {
      gameLoop();
    }, 1000);
  }
  
  function stopBackgroundInterval() {
    clearInterval(backgroundInterval);
  }
  
  function visibilityChange() {
    if (document.hidden) {
      isHidden = true;
      lastUpdate = Date.now();
      stopBackgroundInterval();
      startBackgroundInterval();
    } else {
      isHidden = false;
      lastUpdate = Date.now();
      stopBackgroundInterval();
      requestAnimationFrame(gameLoop);
    }
  }
  
  function startGame() {
    requestAnimationFrame(gameLoop);
  }
  