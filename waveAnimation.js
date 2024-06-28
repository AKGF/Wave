const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 3.2;
const radius = 200;
const points = 250;
const lineWidth = 2;
const speed = 0.3;
const shadowBlur = 0;
const color = 'rgba(0, 150, 255, 0.8)';
const TAO = Math.PI * 2;

let offset = 0;

function mapRange(a, b, c, d, e) {
    return ((a - b) * (e - d)) / (c - b) + d;
}

function drawWave(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(Math.PI);

    ctx.strokeStyle = color;
    ctx.fillStyle = 'rgba(0, 100, 0, 0)';
    ctx.lineWidth = lineWidth;
    ctx.shadowColor = color;
    ctx.shadowBlur = shadowBlur;
    ctx.beginPath();

    for (let i = 0; i <= points; i++) {
        const p = i / points;
        const times = 7;
        const phase = mapRange(
            Math.cos(p * TAO),
            -1,
            1,
            1,
            mapRange(
                Math.sin(((offset + time * speed) * 0.2 + p) * times * TAO),
                -1,
                3,
                0.5,
                0.58
            )
        );

        const x = phase * radius * Math.sin(p * TAO);
        const y = phase * radius * Math.cos(p * TAO);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.fill();
    ctx.stroke();
    ctx.restore();

    offset += 0.01;
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
