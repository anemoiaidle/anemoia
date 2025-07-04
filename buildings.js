import { formatNumber } from './utils.js';
import { updateGoldCounter, updateStats } from './ui.js';
import { getGoldCount, setGoldCount, incrementBuildingsOwned, setGoldPerSecond } from './gameState.js';

// buildings.js
export const buildingData = {
   settlershack: {
      name: 'settlershack',
      displayName: 'Settler Shack',
      cost: 15,
      effect: 100,
      count: 0,
      baseCost: 15,
      incomeMultiplier: 1,
      icon: 'images/settlershack.png',
   },
   lumberyard: {
      name: 'lumberyard',
      displayName: 'Lumber Yard',
      cost: 125,
      effect: 1,
      count: 0,
      baseCost: 125,
      incomeMultiplier: 1,
      icon: 'images/lumberyard.png',
   },
   farm: {
      name: 'farm',
      displayName: 'Farm',
      cost: 1200,
      effect: 5,
      count: 0,
      baseCost: 1200,
      incomeMultiplier: 1,
      icon: 'images/farm.png',
   },
   stonemine: {
      name: 'stonemine',
      displayName: 'Stone Mine',
      cost: 15000,
      effect: 45,
      count: 0,
      baseCost: 15000,
      incomeMultiplier: 1,
      icon: 'images/stonemine.png',
   },
   ironmine: {
      name: 'ironmine',
      displayName: 'Iron Mine',
      cost: 99000,
      effect: 275,
      count: 0,
      baseCost: 99000,
      incomeMultiplier: 1,
      icon: 'images/ironmine.png',
   },
   gemstoneworkshop: {
      name: 'gemstoneworkshop',
      displayName: 'Gemstone Workshop',
      cost: 1200000,
      effect: 1250,
      count: 0,
      baseCost: 1200000,
      incomeMultiplier: 1,
      icon: 'images/gemstoneworkshop.png',
   },
   blacksmith: {
      name: 'blacksmith',
      displayName: 'Blacksmith',
      cost: 22500000,
      effect: 7500,
      count: 0,
      baseCost: 22500000,
      incomeMultiplier: 1,
      icon: 'images/blacksmith.png',
   },
   market: {
      name: 'market',
      displayName: 'Market',
      cost: 400000000,
      effect: 50000,
      count: 0,
      baseCost: 400000000,
      incomeMultiplier: 1,
      icon: 'images/market.png',
   },
   bank: {
      name: 'bank',
      displayName: 'Bank',
      cost: 5250000000,
      effect: 275000,
      count: 0,
      baseCost: 5250000000,
      incomeMultiplier: 1,
      icon: 'images/bank.png',
   },
   barracks: {
      name: 'barracks',
      displayName: 'Barracks',
      cost: 70000000000,
      effect: 2000000,
      count: 0,
      baseCost: 70000000000,
      incomeMultiplier: 1,
      icon: 'images/barracks.png',
   },
   stable: {
      name: 'stable',
      displayName: 'Stable',
      cost: 1000000000000,
      effect: 11250000,
      count: 0,
      baseCost: 1000000000000,
      incomeMultiplier: 1,
      icon: 'images/stable.png',
   },
   harbor: {
      name: 'harbor',
      displayName: 'Harbor',
      cost: 12500000000000,
      effect: 60000000,
      count: 0,
      baseCost: 12500000000000,
      incomeMultiplier: 1,
      icon: 'images/harbor.png',
   },
   archeryrange: {
      name: 'archeryrange',
      displayName: 'Archery Range',
      cost: 180000000000000,
      effect: 420000000,
      count: 0,
      baseCost: 180000000000000,
      incomeMultiplier: 1,
      icon: 'images/archeryrange.png',
   },
   tavern: {
      name: 'tavern',
      displayName: 'Tavern',
      cost: 1900000000000000,
      effect: 3100000000,
      count: 0,
      baseCost: 1900000000000000,
      incomeMultiplier: 1,
      icon: 'images/tavern.png',
   },
   castle: {
      name: 'castle',
      displayName: 'Castle',
      cost: 24500000000000000,
      effect: 20000000000,
      count: 0,
      baseCost: 24500000000000000,
      incomeMultiplier: 1,
      icon: 'images/castle.png',
   },
};

function purchaseBuilding(building) {
   if (getGoldCount() >= buildingData[building].cost) {
		const currentGoldCount = getGoldCount() - buildingData[building].cost;
		console.log(currentGoldCount);
		
		setGoldCount(currentGoldCount);
      buildingData[building].count++;
      incrementBuildingsOwned()
      updateGoldPerSecond(); // Recalculate passive gold
      buildingData[building].cost = Math.round(
         buildingData[building].baseCost * Math.pow(1.15, buildingData[building].count)
      );
      updateGoldCounter();
      updateBuildingButtons();
      updateBuildingCounts();
      updateStats();

		const activeHoverP = document.querySelector('.building-tooltip.visible > p')
		const gps = buildingData[building].count * buildingData[building].effect * buildingData[building].incomeMultiplier;
		activeHoverP.textContent = `Gold per second: ${gps}`;
		
   }
}

export function generateBuildingButtons() {
   console.log('generateBuildingButtons called');
   const buildingsList = document.getElementById('buildings-list');
   if (!buildingsList) {
      console.error('buildings-list element not found!');
      return;
   }
   buildingsList.innerHTML = '';

   for (let building in buildingData) {
      const container = document.createElement('div');
      container.className = 'building-container';

      const button = document.createElement('button');
      button.className = 'building-button';
      button.id = `${building}-button`;

      const formattedBuildingCost = formatNumber(buildingData[building].cost);

      const buildingIcon = document.createElement('img');
      buildingIcon.src = `${buildingData[building].icon}`;
      buildingIcon.alt = `${buildingData[building].displayName}`;

      const buildingDataDiv = document.createElement('div');
      buildingDataDiv.classList.add('building-data');

      const buildingName = document.createElement('h3');
      buildingDataDiv.appendChild(buildingName);

		const buildingCostContainer = document.createElement('div');
		buildingCostContainer.classList.add('building--cost-container')

		const goldIcon = document.createElement('img');
		goldIcon.src = 'images/gold-icon.png';

      const buildingPrice = document.createElement('p');
		buildingPrice.textContent = `${formattedBuildingCost}`;
      
		buildingCostContainer.appendChild(goldIcon);
		buildingCostContainer.appendChild(buildingPrice);

		buildingDataDiv.appendChild(buildingCostContainer);

		const buildingCount = document.createElement('span');
		buildingCount.id = `${building}-count`;
		buildingCount.className = 'building-count';
      buildingCount.textContent = buildingData[building].count;

      button.appendChild(buildingIcon);
      button.appendChild(buildingDataDiv);
		button.appendChild(buildingCount);

      button.addEventListener('click', () => purchaseBuilding(building));

      container.appendChild(button);
      buildingsList.appendChild(container);

		
		const buildingTooltip = document.createElement('div');
		buildingTooltip.classList.add('building-tooltip')

		const gpsParagraph = document.createElement('p');
		
		
		buildingTooltip.appendChild(gpsParagraph);

		document.body.append(buildingTooltip);

		button.addEventListener('mouseenter', (e) => {
			buildingTooltip.classList.add('visible');
			const tooltipHeight = buildingTooltip.offsetHeight || 200;
			const offsetX = 10;  
			const offsetY = 10;

			buildingTooltip.style.left = `${e.pageX + offsetX}px`;
			buildingTooltip.style.top = `${e.pageY - tooltipHeight - offsetY}px`; 

			const gps = buildingData[building].count * buildingData[building].effect * buildingData[building].incomeMultiplier;
			gpsParagraph.textContent = `Gold per second: ${gps}`;


		});

		button.addEventListener('mousemove', (e) => {
			const tooltipHeight = buildingTooltip.offsetHeight || 200;
			const offsetX = 10;
			const offsetY = 10;

			buildingTooltip.style.left = `${e.pageX + offsetX}px`;
			buildingTooltip.style.top = `${e.pageY - tooltipHeight - offsetY}px`;
		});

		button.addEventListener('mouseleave', () => {
			buildingTooltip.classList.remove('visible');
		});
   }
}

// buildings.js
export function updateBuildingButtons() {
   for (let building in buildingData) {
      const button = document.getElementById(`${building}-button`);
      const formattedBuildingCost = formatNumber(buildingData[building].cost);
      if (button) {
         const icon = button.querySelector('img');
         const name = button.querySelector('h3');
         const price = button.querySelector('p');
         const count = document.getElementById(`${building}-count`);

         if (icon) {
            icon.src = buildingData[building].icon;
            icon.alt = buildingData[building].displayName;
         }

         if (name) {
            name.textContent = buildingData[building].displayName;
         }

         if (price) {
            price.innerHTML = `${formattedBuildingCost}`;
         }

         if (count) {
            count.textContent = buildingData[building].count;
         }
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
	setGoldPerSecond(0);
	let currentGoldPerSecond = 0;
   for (let building in buildingData) {
		currentGoldPerSecond += buildingData[building].effect * buildingData[building].count * buildingData[building].incomeMultiplier;
   }
	setGoldPerSecond(currentGoldPerSecond);
}
