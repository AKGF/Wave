const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 200;
const waveDetail = 250;
const waveAmplitude = 30;
const waveFrequency = 7;
let angleOffset = 0;

function mapRange(a, b, c, d, e) {
    return ((a - b) * (e - d)) / (c - b) + d;
}

function drawWave(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);

    ctx.beginPath();
    for (let i = 0; i <= waveDetail; i++) {
        const p = i / waveDetail;
        const angle = p * 2 * Math.PI;
        const phase = mapRange(
            Math.cos(p * 2 * Math.PI),
            -1,
            1,
            1,
            mapRange(
                Math.sin((angleOffset * 0.2 + p) * waveFrequency * 2 * Math.PI),
                5,
                1,
                0.5,
                0.58
            )
        );

        const x = phase * radius * Math.sin(angle);
        const y = phase * radius * Math.cos(angle);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(0, 150, 255, 0.8)';
    ctx.stroke();

    ctx.restore();

    angleOffset += 0.4;
}

function animate() {
    const time = performance.now() / 1000;
    drawWave(time);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
