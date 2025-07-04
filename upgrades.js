// upgrades.js
const upgradeData = {
    'increase-settlershack-income': {
      type: 'building', building: 'settlershack', multiplier: 1.2, cost: 100, purchased: false
    },
    'increase-total-income': {
      type: 'total', multiplier: 1.1, cost: 100, purchased: false
    },
    'double-lumberyard-income': {
      type: 'building', building: 'lumberyard', multiplier: 2, cost: 100, purchased: false
    },
    'increase-settlershack-income-one': {
      type: 'building', building: 'settlershack', multiplier: 2, cost: 100, purchased: false
    },
    'increase-settlershack-income-one-two': {
      type: 'building', building: 'settlershack', multiplier: 2, cost: 500, purchased: false
    },
    'increase-settlershack-income-ten': {
      type: 'building', building: 'settlershack', multiplier: 2, cost: 1000, purchased: false
    },
    'increase-total-income-settlershack-upgrade': {
      type: 'building', building: 'settlershack', multiplier: 1, cost: 5000, purchased: false
    }
  };
  
  function purchaseUpgrade(upgradeId) {
    const upgrade = upgradeData[upgradeId];
    if (goldCount >= upgrade.cost && !upgrade.purchased) {
      goldCount -= upgrade.cost;
      upgrade.purchased = true;
      if (upgrade.type === 'building') {
        buildingData[upgrade.building].incomeMultiplier *= upgrade.multiplier;
      } else if (upgrade.type === 'total') {
        for (let building in buildingData) {
          buildingData[building].incomeMultiplier *= upgrade.multiplier;
        }
      }
      updateGoldPerSecond();
      updateGoldCounter();
      document.getElementById(upgradeId).style.display = 'none';
      updateStats();
    }
  }
  