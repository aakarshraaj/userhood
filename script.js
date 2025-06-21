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
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Increase density by reducing spacing
const spacing = 40;
const radius = 2.2;
const dots = [];

for (let y = 0; y < height + spacing; y += spacing) {
  for (let x = 0; x < width + spacing; x += spacing) {
    dots.push({ x, y, ox: x, oy: y }); // ox/oy = original position
  }
}

let mouse = { x: -9999, y: -9999 };

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

    // Wider ripple zone
    const rippleRadius = 400;

    if (dist < rippleRadius) {
      const angle = Math.atan2(dy, dx);
      const push = (rippleRadius - dist) * 0.03; // gentler push
      dot.x += Math.cos(angle) * push;
      dot.y += Math.sin(angle) * push;
    }

    // Slower ease-back
    dot.x += (dot.ox - dot.x) * 0.02;
    dot.y += (dot.oy - dot.y) * 0.02;

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fill();
  }

  requestAnimationFrame(animateDots);
}

//custom-cursor

const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = `${mouseX}px`;
  dot.style.top = `${mouseY}px`;
});

// Smooth trailing ring
function updateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.left = `${ringX}px`;
  ring.style.top = `${ringY}px`;
  requestAnimationFrame(updateRing);
}
updateRing();

// Optional click pulse
window.addEventListener('click', () => {
  const pulse = document.createElement('div');
  pulse.className = 'cursor-pulse';
  pulse.style.left = `${mouseX}px`;
  pulse.style.top = `${mouseY}px`;
  document.body.appendChild(pulse);
  setTimeout(() => pulse.remove(), 500);
});


animateDots();
