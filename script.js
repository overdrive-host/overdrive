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

// Nebula effect
const canvas = document.getElementById('nebula-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const clouds = [];
const numClouds = 5;
const nebulaColors = [
    'rgba(255, 105, 180, 0.15)', // Rosado
    'rgba(138, 43, 226, 0.15)',  // Morado
    'rgba(50, 205, 50, 0.15)',   // Verde
    'rgba(0, 191, 255, 0.15)'    // Celeste
];

function createCloud() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 100 + Math.random() * 200,
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
    };
}

for (let i = 0; i < numClouds; i++) {
    clouds.push(createCloud());
}

function drawNebula() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clouds.forEach(cloud => {
        const gradient = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius);
        gradient.addColorStop(0, cloud.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        cloud.x += cloud.speedX;
        cloud.y += cloud.speedY;

        if (cloud.x < -cloud.radius) cloud.x = canvas.width + cloud.radius;
        if (cloud.x > canvas.width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.y < -cloud.radius) cloud.y = canvas.height + cloud.radius;
        if (cloud.y > canvas.height + cloud.radius) cloud.y = -cloud.radius;
    });
    requestAnimationFrame(drawNebula);
}

drawNebula();
