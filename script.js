const shapeCountEl = document.getElementById('shape-count');
const shapeClickValueEl = document.getElementById('shape-click-value');
const shapePsValueEl = document.getElementById('shape-ps-value');
const prestigeValueEl = document.getElementById('prestige-value');
const shapeTarget = document.getElementById('shape-target');
const buildingListEl = document.getElementById('building-list');
const upgradeListEl = document.getElementById('upgrade-list');
const prestigeBtn = document.getElementById('prestige-btn');

const initialCosts = {
  'Triangle Factory': 15,
  'Square Mill': 300,
  'Pentagon Plant': 5000,
  'Hexagon Hub': 75000,
};

const state = {
  shapes: 0,
  shapesPerClick: 1,
  shapesPerSecond: 0,
  prestigeLevel: 0,
  prestigeMultiplier: 1,
  prestigeThreshold: 10000,
  buildings: [
    { name: 'Triangle Factory', cost: 15, production: 1, count: 0 },
    { name: 'Square Mill', cost: 300, production: 5, count: 0 },
    { name: 'Pentagon Plant', cost: 5000, production: 25, count: 0 },
    { name: 'Hexagon Hub', cost: 75000, production: 125, count: 0 },
  ],
  upgrades: [
    { name: 'Sharper Clicks', cost: 50, effect: { type: 'click', multiplier: 2 }, owned: false },
    { name: 'Factory Boost', cost: 500, effect: { type: 'building', multiplier: 2 }, owned: false },
    { name: 'Mega Clicks', cost: 5000, effect: { type: 'click', multiplier: 5 }, owned: false },
    { name: 'Plant Efficiency', cost: 25000, effect: { type: 'building', multiplier: 3 }, owned: false },
  ],
};

updateShapesPerSecond();

function renderBuildings() {
  buildingListEl.innerHTML = '';
  state.buildings.forEach((building, index) => {
    const card = document.createElement('div');
    card.className = 'building-card';
    card.innerHTML = `
      <h3>${building.name}</h3>
      <p>Count: ${building.count}</p>
      <p>Cost: ${building.cost.toLocaleString()}</p>
      <p>Production: ${building.production}/s</p>
      <button class="buy-btn">Buy</button>
    `;
    const buyBtn = card.querySelector('.buy-btn');
    buyBtn.addEventListener('click', () => buyBuilding(index));
    buildingListEl.appendChild(card);
  });
}

function updateShapesPerSecond() {
  state.shapesPerSecond = state.buildings.reduce((total, building) => total + building.count * building.production, 0);
}

function buyBuilding(index) {
  const building = state.buildings[index];
  if (state.shapes >= building.cost) {
    state.shapes -= building.cost;
    building.count += 1;
    building.cost = Math.floor(building.cost * 1.15);
    updateShapesPerSecond();
    updateDisplay();
  }
}

function renderUpgrades() {
  upgradeListEl.innerHTML = '';
  state.upgrades.forEach((upgrade, index) => {
    const card = document.createElement('div');
    card.className = `upgrade-card ${upgrade.owned ? 'owned' : ''}`;
    card.innerHTML = `
      <h4>${upgrade.name}</h4>
      <p>Cost: ${upgrade.cost.toLocaleString()}</p>
      <p>Effect: ${upgrade.effect.type === 'click' ? `+${upgrade.effect.multiplier}x click power` : `+${upgrade.effect.multiplier}x building production`}</p>
      <button class="buy-btn" ${upgrade.owned ? 'disabled' : ''}>${upgrade.owned ? 'Owned' : 'Buy'}</button>
    `;
    if (!upgrade.owned) {
      const buyBtn = card.querySelector('.buy-btn');
      buyBtn.addEventListener('click', () => buyUpgrade(index));
    }
    upgradeListEl.appendChild(card);
  });
}

function buyUpgrade(index) {
  const upgrade = state.upgrades[index];
  if (!upgrade.owned && state.shapes >= upgrade.cost) {
    state.shapes -= upgrade.cost;
    upgrade.owned = true;
    applyUpgradeEffect(upgrade);
    updateDisplay();
  }
}

function applyUpgradeEffect(upgrade) {
  if (upgrade.effect.type === 'click') {
    state.shapesPerClick *= upgrade.effect.multiplier;
  } else if (upgrade.effect.type === 'building') {
    // Apply multiplier to all buildings' production
    state.buildings.forEach(building => {
      building.production *= upgrade.effect.multiplier;
    });
    updateShapesPerSecond();
  }
}

function performPrestige() {
  state.prestigeLevel += 1;
  state.prestigeMultiplier = Math.pow(2, state.prestigeLevel);
  state.shapes = 0;
  state.shapesPerClick = 1;
  state.shapesPerSecond = 0;
  state.buildings.forEach(building => {
    building.count = 0;
    building.cost = initialCosts[building.name];
  });
  state.upgrades.forEach(upgrade => {
    upgrade.owned = false;
  });
  updateShapesPerSecond();
}

function updateDisplay() {
  shapeCountEl.textContent = state.shapes.toLocaleString();
  shapeClickValueEl.textContent = (state.shapesPerClick * state.prestigeMultiplier).toLocaleString();
  shapePsValueEl.textContent = (state.shapesPerSecond * state.prestigeMultiplier).toLocaleString();
  prestigeValueEl.textContent = state.prestigeLevel.toLocaleString();
  renderBuildings();
  renderUpgrades();
  prestigeBtn.disabled = state.shapes < state.prestigeThreshold;
}

shapeTarget.addEventListener('click', () => {
  state.shapes += state.shapesPerClick * state.prestigeMultiplier;
  updateDisplay();
});

prestigeBtn.addEventListener('click', () => {
  if (state.shapes >= state.prestigeThreshold) {
    if (confirm('Are you sure you want to prestige? This will reset your progress for a permanent bonus.')) {
      performPrestige();
      updateDisplay();
    }
  }
});

updateDisplay();

setInterval(() => {
  state.shapes += state.shapesPerSecond * state.prestigeMultiplier;
  updateDisplay();
}, 1000);
