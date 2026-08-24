// Sprachumschaltung DE / EN
const toggle = document.getElementById("langToggle");

function setLang(lang) {
    document.documentElement.lang = lang;
    toggle.textContent = lang === "de" ? "EN" : "DE";
    try { localStorage.setItem("nh-lang", lang); } catch (e) {}
}

toggle.addEventListener("click", () => {
    setLang(document.documentElement.lang === "de" ? "en" : "de");
});

try {
    const saved = localStorage.getItem("nh-lang");
    if (saved) setLang(saved);
} catch (e) {}

// Eingebettete Vimeo-Player: Still anklicken -> Player startet an Ort und Stelle
function activatePlayer(el) {
    if (el.dataset.active) return;
    el.dataset.active = "1";
    const id = el.dataset.vimeo;
    const iframe = document.createElement("iframe");
    iframe.src =
          "https://player.vimeo.com/video/" + id +
          "?autoplay=1&dnt=1&title=0&byline=0&portrait=0&color=e0a458";
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    el.innerHTML = "";
    el.appendChild(iframe);
    el.style.cursor = "default";
}

document.querySelectorAll(".player[data-vimeo]").forEach((el) => {
    el.addEventListener("click", () => activatePlayer(el));
    el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  activatePlayer(el);
          }
    });
});

// Lokale Videos (Making-of): Still anklicken -> <video> startet
function activateLocalPlayer(el) {
    if (el.dataset.active) return;
    el.dataset.active = "1";
    const video = document.createElement("video");
    video.src = el.dataset.src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    el.innerHTML = "";
    el.appendChild(video);
    el.style.cursor = "default";
}

document.querySelectorAll(".player-local[data-src]").forEach((el) => {
    el.addEventListener("click", () => activateLocalPlayer(el));
    el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  activateLocalPlayer(el);
          }
    });
});

// Sanftes Einblenden beim Scrollen
const observer = new IntersectionObserver(
    (entries) => {
          entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                            entry.target.classList.add("visible");
                            observer.unobserve(entry.target);
                  }
          });
    },
  { threshold: 0.12 }
  );

document
  .querySelectorAll(".work, .card, .dev, .section > h2, .section-intro")
  .forEach((el) => {
        el.classList.add("reveal");
        observer.observe(el);
  });
