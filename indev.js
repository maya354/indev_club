const toggleInput = document.getElementById("theme-toggle");
const page = document.getElementById("page");
const logo = document.getElementById("logo");

// THEME TOGGLE
if (localStorage.getItem("theme")) {
  const savedTheme = localStorage.getItem("theme");
  page.className = savedTheme;
  updateTheme(savedTheme);
  toggleInput.checked = savedTheme === "dark";
}
toggleInput.addEventListener("change", () => {
  if (toggleInput.checked) {
    page.classList.replace("light", "dark");
    updateTheme("dark");
    localStorage.setItem("theme", "dark");
  } else {
    page.classList.replace("dark", "light");
    updateTheme("light");
    localStorage.setItem("theme", "light");
  }
});
function updateTheme(theme) {
  logo.src = theme === "dark" ? "dark-logo.png" : "light-logo.png";
}

// FALLING PARTICLES
const fallingContainer = document.querySelector(".falling-words");
let particleInterval = null;
function createParticle() {
  if (!fallingContainer) return;
  const particle = document.createElement("span");
  particle.classList.add("falling-particle");
  particle.style.left = Math.random() * 100 + "vw";
  const size = (Math.random() * 6) + 4;
  particle.style.width = size + "px";
  particle.style.height = size + "px";
  const duration = 3 + Math.random() * 4;
  particle.style.animationDuration = duration + "s";
  if (page.classList.contains("dark")) {
    particle.style.background = "rgba(179,136,255,0.92)";
    particle.style.boxShadow = "0 0 12px rgba(179,136,255,0.9)";
  } else {
    particle.style.background = "rgba(106,27,154,0.85)";
    particle.style.boxShadow = "0 0 10px rgba(123,31,162,0.65)";
  }
  fallingContainer.appendChild(particle);
  setTimeout(() => particle.remove(), (duration * 1000) + 500);
}
function startParticles() {
  if (particleInterval) return;
  particleInterval = setInterval(createParticle, 220);
}
function stopParticles() {
  if (!particleInterval) return;
  clearInterval(particleInterval);
  particleInterval = null;
}
const animatedEls = Array.from(document.querySelectorAll(
  '.logo-container img, .club-name, .tagline, .motto, .nav-link'
));
if (animatedEls.length === 0) {
  setTimeout(startParticles, 3000);
} else {
  let finished = 0;
  animatedEls.forEach(el => {
    let fallbackTimer = setTimeout(() => {
      finished++;
      if (finished === animatedEls.length) startParticles();
    }, 3500);
    el.addEventListener('animationend', () => {
      clearTimeout(fallbackTimer);
      finished++;
      if (finished === animatedEls.length) startParticles();
    }, { once: true });
  });
}

// Smooth scroll highlight (optional pro touch)
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = "";
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    if (top >= offset && top < offset + height) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
