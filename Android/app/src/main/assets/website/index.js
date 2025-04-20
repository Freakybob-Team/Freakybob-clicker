let clickCount = 0;
let clicksPerSecond = 0;
let autoClicker = false;
let freakyStar = { owned: false, clicksPerSecond: 0 };
let clickMultiplier = 1;
let multipliers = {
    1: { count: 0, max: 20, cost: 15, increment: 1 },
    8: { count: 0, max: 20, cost: 120, increment: 8 }
};
const achievements = [
    { name: 'Started this Journey', clicks: 1 },
    { name: 'Beginner Clicker', clicks: 300 },
    { name: 'You must love clicking freakybob', clicks: 900 },
    { name: 'First 1000!', clicks: 1000 },
    { name: 'Finger destroyer', clicks: 3000 },
    { name: 'Intermediate clicker', clicks: 7000 },
    { name: 'Mouse destroyer', clicks: 13000 },
    { name: 'First 20,000!', clicks: 20000 },
    { name: 'Beginner Freakybob', clicks: 27000 },
    { name: 'King clicker', clicks: 70000 },
    { name: "THE ULTIMATE FINGER DESTROYER!!", clicks: 100000 },
    { name: 'Freakybob of the year!', clicks: 117000 },
    { name: 'The literal Freakybob god', clicks: 130000 },
    { name: 'The mouse is not dead yet!', clicks: 135000 },
    { name: 'Freakybob of the century', clicks: 140000 },
    { name: 'Freakybob of the millennium', clicks: 150000 },
    { name: 'The ultimate Freakybob', clicks: 160000 },
    { name: 'Freakybob of the universe', clicks: 190000 },
    { name: 'The Freakybob God', clicks: 217000 },
    { name: 'The..end..?', clicks: 240000 },
    { name: 'For now...', clicks: 260000 }
];

const unlockedAchievements = new Set();
let isPlayingSound = false;

function playClickSound() {
    if (isPlayingSound) return;
    isPlayingSound = true;

    const clickSound = new Audio('https://freakybob.site/audio/i%E2%80%99m-spongebob-made-with-Voicemod.mp3');
    clickSound.play().catch(err => console.error(err)).finally(() => {
        isPlayingSound = false;
    });
}

function updateButtons() {
    const autoClickerButton = document.getElementById('buy-autoclicker');
    const freakyStarButton = document.getElementById('buy-freakystar');
    const multiplier1Button = document.getElementById('buy-multiplier-1');
    const multiplier8Button = document.getElementById('buy-multiplier-8');

    autoClickerButton.classList.toggle('disabled', clickCount < 100 || autoClicker);
    autoClickerButton.classList.toggle('enabled', clickCount >= 100 && !autoClicker);

    freakyStarButton.classList.toggle('disabled', clickCount < 300 || freakyStar.owned);
    freakyStarButton.classList.toggle('enabled', clickCount >= 300 && !freakyStar.owned);

    multiplier1Button.classList.toggle('disabled', clickCount < multipliers[1].cost || multipliers[1].count >= multipliers[1].max);
    multiplier1Button.classList.toggle('enabled', clickCount >= multipliers[1].cost && multipliers[1].count < multipliers[1].max);

    multiplier8Button.classList.toggle('disabled', clickCount < multipliers[8].cost || multipliers[8].count >= multipliers[8].max);
    multiplier8Button.classList.toggle('enabled', clickCount >= multipliers[8].cost && multipliers[8].count < multipliers[8].max);
}

function updateStats() {
    document.getElementById('click-count').textContent = clickCount;
    updateClicksPerSecond();
    checkAchievements();
    updateButtons();
}

function incrementClicks() {
    clickCount += clickMultiplier;
    updateStats();
    playClickSound();
}

function buyAutoClicker() {
    if (clickCount >= 100 && !autoClicker) {
        clickCount -= 100;
        autoClicker = true;
        updateStats();
        startAutoClicker();
    }
}

function buyFreakyStar() {
    if (clickCount >= 300 && !freakyStar.owned) {
        clickCount -= 300;
        freakyStar.owned = true;
        freakyStar.clicksPerSecond = 10;
        updateStats();
        startFreakyStar();
    }
}

function buyMultiplier(level) {
    const multiplierData = multipliers[level];
    if (multiplierData && clickCount >= multiplierData.cost && multiplierData.count < multiplierData.max) {
        clickCount -= multiplierData.cost;
        multiplierData.count++;
        clickMultiplier += multiplierData.increment;
        updateStats();
    }
}

function startAutoClicker() {
    setInterval(() => {
        if (autoClicker) {
            clickCount += 1;
            updateStats();
        }
    }, 1000);
}

function startFreakyStar() {
    setInterval(() => {
        if (freakyStar.owned) {
            clickCount += freakyStar.clicksPerSecond;
            updateStats();
        }
    }, 1000);
}

function updateClicksPerSecond() {
    clicksPerSecond = (autoClicker ? 1 : 0) + (freakyStar.owned ? freakyStar.clicksPerSecond : 0);
    document.getElementById('clicks-per-second').textContent = clicksPerSecond.toFixed(2);
}

function checkAchievements() {
    achievements.forEach(achievement => {
        if (clickCount >= achievement.clicks && !unlockedAchievements.has(achievement.name)) {
            unlockedAchievements.add(achievement.name);
            displayAchievement(achievement.name);
        }
    });
}

function displayAchievement(name) {
    const achievementsDiv = document.getElementById('achievements');
    const achievementElement = document.createElement('p');
    achievementElement.classList.add('achievement');
    achievementElement.textContent = name;
    achievementsDiv.appendChild(achievementElement);

    setTimeout(() => {
        achievementElement.classList.add('out');
        setTimeout(() => {
            achievementElement.remove();
        }, 500);
    }, 2000);
}

document.getElementById('clicker').addEventListener('click', incrementClicks);
document.getElementById('buy-autoclicker').addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains('enabled')) {
        buyAutoClicker();
    }
});

document.getElementById('buy-freakystar').addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains('enabled')) {
        buyFreakyStar();
    }
});

document.getElementById('buy-multiplier-1').addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains('enabled')) {
        buyMultiplier(1);
    }
});

document.getElementById('buy-multiplier-8').addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains('enabled')) {
        buyMultiplier(8);
    }
});

updateButtons();
updateStats();