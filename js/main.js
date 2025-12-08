// MENU MOBILE
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Chiudi il menu quando clicchi su un link
  navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("open");
    }
  });
}

// ANIMAZIONI ALLO SCROLL (sezioni + testi)
const animatedElements = document.querySelectorAll(
  ".fade-in-up, .scroll-section"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // quando entra → attivo animazione
        entry.target.classList.add("visible");
      } else {
        // quando esce → tolgo la visible per poter ri-animare
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

animatedElements.forEach((el) => observer.observe(el));

// ANIMAZIONE HERO "RISCOPRI / IL TUO CORPO"
const heroLines = document.querySelectorAll(".hero-line");

const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate"); // ri-anima ogni volta
      } else {
        entry.target.classList.remove("animate"); // rimuovo per riattivarla quando torni su
      }
    });
  },
  {
    threshold: 0.6, // deve essere ben visibile per partire
  }
);

heroLines.forEach((line) => heroObserver.observe(line));