  import { formatNumber } from "./utils.js";
  import { updateGoldCounter, updateStats } from "./ui.js";
  
  // buildings.js
  const buildingData = {
    settlershack: {
      name: 'settlershack',
      displayName: 'Settler Shack',
      cost: 15,
      effect: 100000000,
      count: 0,
      baseCost: 15,
      incomeMultiplier: 1,
      icon: 'images/settlershack.png'
    },
    lumberyard: {
      name: 'lumberyard',
      displayName: 'Lumber Yard',
      cost: 125,
      effect: 1,
      count: 0,
      baseCost: 125,
      incomeMultiplier: 1,
      icon: 'images/lumberyard.png'
    },
    farm: {
      name: 'farm',
      displayName: 'Farm',
      cost: 1200,
      effect: 5,
      count: 0,
      baseCost: 1200,
      incomeMultiplier: 1,
      icon: 'images/farm.png'
    },
    stonemine: {
      name: 'stonemine',
      displayName: 'Stone Mine',
      cost: 15000,
      effect: 45,
      count: 0,
      baseCost: 15000,
      incomeMultiplier: 1,
      icon: 'images/stonemine.png'
    },
    ironmine: {
      name: 'ironmine',
      displayName: 'Iron Mine',
      cost: 99000,
      effect: 275,
      count: 0,
      baseCost: 99000,
      incomeMultiplier: 1,
      icon: 'images/ironmine.png'
    },
    gemstoneworkshop: {
      name: 'gemstoneworkshop',
      displayName: 'Gemstone Workshop',
      cost: 1200000,
      effect: 1250,
      count: 0,
      baseCost: 1200000,
      incomeMultiplier: 1,
      icon: 'images/gemstoneworkshop.png'
    },
    blacksmith: {
      name: 'blacksmith',
      displayName: 'Blacksmith',
      cost: 22500000,
      effect: 7500,
      count: 0,
      baseCost: 22500000,
      incomeMultiplier: 1,
      icon: 'images/blacksmith.png'
    },
    market: {
      name: 'market',
      displayName: 'Market',
      cost: 400000000,
      effect: 50000,
      count: 0,
      baseCost: 400000000,
      incomeMultiplier: 1,
      icon: 'images/market.png'
    },
    bank: {
      name: 'bank',
      displayName: 'Bank',
      cost: 5250000000,
      effect: 275000,
      count: 0,
      baseCost: 5250000000,
      incomeMultiplier: 1,
      icon: 'images/bank.png'
    },
    barracks: {
      name: 'barracks',
      displayName: 'Barracks',
      cost: 70000000000,
      effect: 2000000,
      count: 0,
      baseCost: 70000000000,
      incomeMultiplier: 1,
      icon: 'images/barracks.png'
    },
    stable: {
      name: 'stable',
      displayName: 'Stable',
      cost: 1000000000000,
      effect: 11250000,
      count: 0,
      baseCost: 1000000000000,
      incomeMultiplier: 1,
      icon: 'images/stable.png'
    },
    harbor: {
      name: 'harbor',
      displayName: 'Harbor',
      cost: 12500000000000,
      effect: 60000000,
      count: 0,
      baseCost: 12500000000000,
      incomeMultiplier: 1,
      icon: 'images/harbor.png'
    },
    archeryrange: {
      name: 'archeryrange',
      displayName: 'Archery Range',
      cost: 180000000000000,
      effect: 420000000,
      count: 0,
      baseCost: 180000000000000,
      incomeMultiplier: 1,
      icon: 'images/archeryrange.png'
    },
    tavern: {
      name: 'tavern',
      displayName: 'Tavern',
      cost: 1900000000000000,
      effect: 3100000000,
      count: 0,
      baseCost: 1900000000000000,
      incomeMultiplier: 1,
      icon: 'images/tavern.png'
    },
    castle: {
      name: 'castle',
      displayName: 'Castle',
      cost: 24500000000000000,
      effect: 20000000000,
      count: 0,
      baseCost: 24500000000000000,
      incomeMultiplier: 1,
      icon: 'images/castle.png'
    }
  };
  

  
  function purchaseBuilding(building) {
    if (goldCount >= buildingData[building].cost) {
      goldCount -= buildingData[building].cost;
      buildingData[building].count++;
      buildingsOwned++;
      updateGoldPerSecond(); // Recalculate passive gold
      buildingData[building].cost = Math.round(
        buildingData[building].baseCost * Math.pow(1.15, buildingData[building].count)
      );
      updateGoldCounter();
      updateBuildingButtons();
      updateBuildingCounts();
      updateStats();
    }
  }
  
  export function generateBuildingButtons() {
    console.log("generateBuildingButtons called");
    const buildingsList = document.getElementById('buildings-list');
    if (!buildingsList) {
      console.error("buildings-list element not found!");
      return;
    }
    buildingsList.innerHTML = '';
  
    for (let building in buildingData) {
      const container = document.createElement('div');
      container.className = 'building-container';
  
      const countSpan = document.createElement('span');
      countSpan.id = `${building}-count`;
      countSpan.className = 'building-count';
      countSpan.innerText = buildingData[building].count;
  
      const button = document.createElement('button');
      button.className = 'building-button';
      button.id = `${building}-button`;
      
      const formattedBuildingCost = formatNumber(buildingData[building].cost)
      button.innerHTML = `
        <img src="${buildingData[building].icon}" 
             alt="${buildingData[building].displayName} Icon" 
             class="icon">
        ${buildingData[building].displayName} (Cost: ${formattedBuildingCost} Gold)
      `;
  
      button.addEventListener('click', () => purchaseBuilding(building));
  
      container.appendChild(countSpan);
      container.appendChild(button);
      buildingsList.appendChild(container);
    }
  }
  
  
// buildings.js
export function updateBuildingButtons() {
  for (let building in buildingData) {
    const button = document.getElementById(`${building}-button`);
    const formattedBuildingCost = formatNumber(buildingData[building].cost)
    if (button) {
      // Again, use an <img> plus text
      button.innerHTML = `
        <img src="${buildingData[building].icon}" alt="${buildingData[building].displayName} Icon" class="icon">
        ${buildingData[building].displayName} (Cost: ${formattedBuildingCost} Gold)
      `;
    }
  }
}

  
  export function updateBuildingCounts() {
    for (let building in buildingData) {
      const countSpan = document.getElementById(`${building}-count`);
      if (countSpan) {
        countSpan.innerText = buildingData[building].count;
      }
    }
  }
  
  export function updateGoldPerSecond() {
    goldPerSecond = 0;
    for (let building in buildingData) {
      goldPerSecond += buildingData[building].effect *
        buildingData[building].count *
        buildingData[building].incomeMultiplier;
    }
  }
  