const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 200;
const waveDetail = 300; // Number of points in the wave
const waveAmplitude = 30;
const waveFrequency = 2;
let angleOffset = 0;

function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    for (let i = 0; i <= waveDetail; i++) {
        const angle = (i / waveDetail) * 2 * Math.PI;
        const wave = waveAmplitude * Math.sin(i * waveFrequency / waveDetail * 2 * Math.PI + angleOffset);
        const x = centerX + (radius + wave) * Math.cos(angle);
        const y = centerY + (radius + wave) * Math.sin(angle);
        ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(0, 150, 255, 0.8)';
    ctx.stroke();

    angleOffset += 0.05; // Increment the angle offset to rotate
}

function animate() {
    drawWave();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
