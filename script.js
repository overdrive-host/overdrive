const starfield = document.getElementById('starfield');
const numStars = 350;
for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 6}s`;
    star.style.setProperty('--direction', Math.random() > 0.5 ? 1 : -1);
    star.style.setProperty('--y-direction', Math.random() > 0.5 ? 1 : -1);
    starfield.appendChild(star);
}

const stars = document.querySelectorAll('.star');
function triggerBrightTwinkleEffect() {
    const randomStar = stars[Math.floor(Math.random() * numStars)];
    randomStar.classList.add('bright-twinkle');
    setTimeout(() => {
        randomStar.classList.remove('bright-twinkle');
    }, 3500);
}

function scheduleNextTwinkle() {
    setTimeout(() => {
        triggerBrightTwinkleEffect();
        scheduleNextTwinkle();
    }, 2000 + Math.random() * 5000);
}
scheduleNextTwinkle();
triggerBrightTwinkleEffect();