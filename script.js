// Logo gyroscope
const logo = document.querySelector('.logo');
let logoTargetX = 0, logoTargetY = 0, logoTargetZ = 0;
let logoCurrentX = 0, logoCurrentY = 0, logoCurrentZ = 0;

function onMouseMove(e) {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  logoTargetY = dx * 8;
  logoTargetX = -dy * 6;
  logoTargetZ = dx * 2;
}

function animateLogo() {
  logoCurrentX += (logoTargetX - logoCurrentX) * 0.08;
  logoCurrentY += (logoTargetY - logoCurrentY) * 0.08;
  logoCurrentZ += (logoTargetZ - logoCurrentZ) * 0.08;
  logo.style.transform = `rotateX(${logoCurrentX}deg) rotateY(${logoCurrentY}deg) rotateZ(${logoCurrentZ}deg)`;
  requestAnimationFrame(animateLogo);
}

window.addEventListener('mousemove', onMouseMove);
animateLogo();

// Scroll reveal
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));

// Ripple canvas
const canvas = document.getElementById('ripple-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let spacing = 40;
let radius = 2.2;
let dots = [];

let mouse = { x: -9999, y: -9999 };

// Canvas setup + dot generation
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = canvas.width;
  height = canvas.height;

  dots = [];
  for (let y = 0; y < height + spacing; y += spacing) {
    for (let x = 0; x < width + spacing; x += spacing) {
      dots.push({ x, y, ox: x, oy: y }); // ox/oy = original position
    }
  }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Track mouse
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animateDots() {
  ctx.clearRect(0, 0, width, height);

  for (let dot of dots) {
    const dx = dot.x - mouse.x;
    const dy = dot.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const rippleRadius = 400;

    if (dist < rippleRadius) {
      const angle = Math.atan2(dy, dx);
      const push = (rippleRadius - dist) * 0.03;
      dot.x += Math.cos(angle) * push;
      dot.y += Math.sin(angle) * push;
    }

    dot.x += (dot.ox - dot.x) * 0.02;
    dot.y += (dot.oy - dot.y) * 0.02;

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fill();
  }

  requestAnimationFrame(animateDots);
}

animateDots();



const cursor = document.getElementById('custom-cursor');
const cursorSVG = cursor.querySelector('svg');

window.addEventListener('mousemove', e => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;

  // Animate based on movement direction
  const dx = e.movementX;
  const dy = e.movementY;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

  cursorSVG.style.transform = `rotate(${angle}deg) scale(1.05)`;
});

window.addEventListener('mouseout', () => {
  cursor.style.opacity = 0;
});
window.addEventListener('mouseover', () => {
  cursor.style.opacity = 1;
});
