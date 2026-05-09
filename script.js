// =========================
// script.js
// =========================

const audio = document.getElementById("audio");
const playBtns = document.querySelectorAll(".play-toggle");
const heroBtn = document.getElementById("hero-play-btn");

// INTRO SCREEN LOGIC (Girar Microfone)
const introScreen = document.getElementById('intro-screen');
const micContainer = document.getElementById('mic-container');

micContainer.addEventListener('click', () => {
  // Adiciona a classe que gira o microfone
  micContainer.classList.add('spin-animation');
  
  // Após girar (1.5s), esconde a tela de introdução e dá play
  setTimeout(() => {
    introScreen.style.opacity = '0';
    introScreen.style.visibility = 'hidden';
    toggleMusic(true); // Começa a tocar automaticamente
  }, 1500);
});


// FUNÇÃO DE PLAY/PAUSE
function toggleMusic(forcePlay = false){
  if(audio.paused || forcePlay){
    audio.play();
    updatePlayIcons('<i class="fa-solid fa-pause"></i>');
    document.getElementById("equalizer").classList.add("playing");
    document.getElementById("music-wave").classList.add("playing");
  } else {
    audio.pause();
    updatePlayIcons('<i class="fa-solid fa-play"></i>');
    document.getElementById("equalizer").classList.remove("playing");
    document.getElementById("music-wave").classList.remove("playing");
  }
}

function updatePlayIcons(htmlContent) {
  playBtns.forEach(btn => btn.innerHTML = htmlContent);
}

// Eventos de Play/Pause
playBtns.forEach(btn => btn.addEventListener("click", () => toggleMusic()));
heroBtn.addEventListener("click", () => {
    document.querySelector('.music-section').scrollIntoView({ behavior: 'smooth' });
    toggleMusic(true);
});

// ATUALIZAR BARRA DE PROGRESSO E TEMPO
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;
    
    // Atualizar textos de tempo
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

// CLICAR NA BARRA PARA AVANÇAR
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  
  audio.currentTime = (clickX / width) * duration;
});

// Função Auxiliar para formatar tempo (min:seg)
function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// MENU MOBILE
const menuToggle = document.getElementById("menu-toggle");
const closeMenu = document.getElementById("close-menu");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => sidebar.classList.add("active"));
closeMenu.addEventListener("click", () => sidebar.classList.remove("active"));

// PREVENÇÕES DO USUÁRIO
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
  if (e.ctrlKey && (e.key === "s" || e.key === "u" || e.key === "S" || e.key === "U")) {
    e.preventDefault();
  }
});

// PARALLAX HERO
const hero = document.getElementById("hero");
hero.addEventListener("mousemove",(e)=>{
  const x = (window.innerWidth / 2 - e.pageX) / 50;
  const y = (window.innerHeight / 2 - e.pageY) / 50;
  hero.style.backgroundPosition = `${x}px ${y}px`;
});

// FADE-IN SCROLL
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.querySelectorAll(".music-section, .floating-player").forEach(el=>{
  el.style.opacity = 0;
  el.style.transform = "translateY(60px)";
  el.style.transition = "1s";
  observer.observe(el);
});