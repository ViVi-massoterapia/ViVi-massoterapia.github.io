window.addEventListener("load", () => {
  console.log("✅ gallery.js caricato");

  const thumbs = Array.from(document.querySelectorAll(".gallery-item img"));
  const lightbox = document.getElementById("lightbox");

  console.log("🔍 thumbs trovate:", thumbs.length);
  console.log("🔍 lightbox esiste:", !!lightbox);

  if (!lightbox || thumbs.length === 0) {
    console.warn("Qualcosa manca nel DOM (lightbox o immagini)");
    return;
  }

  const imgEl    = lightbox.querySelector(".lightbox__image");
  const btnClose = lightbox.querySelector(".lightbox__close");
  const btnPrev  = lightbox.querySelector(".lightbox__arrow--prev");
  const btnNext  = lightbox.querySelector(".lightbox__arrow--next");
  const backdrop = lightbox.querySelector(".lightbox__backdrop");

  const sources = thumbs.map((img) => img.getAttribute("src"));
  let currentIndex = 0;

  function updateImage() {
    const src = sources[currentIndex];
    imgEl.src = src;
    imgEl.alt = thumbs[currentIndex].alt || "";
    console.log("📷 mostro immagine index", currentIndex, "src:", src);
  }

  function openLightbox(index) {
    currentIndex = index;
    updateImage();
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    console.log("🟢 lightbox aperto su index", index);
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    console.log("🔴 lightbox chiuso");
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % sources.length;
    updateImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + sources.length) % sources.length;
    updateImage();
  }

  // click sulle miniature
  thumbs.forEach((thumb, idx) => {
    thumb.style.cursor = "pointer";
    thumb.addEventListener("click", () => {
      console.log("🖱 click sulla miniatura", idx);
      openLightbox(idx);
    });
  });

  // pulsanti frecce / chiudi
  btnNext.addEventListener("click", showNext);
  btnPrev.addEventListener("click", showPrev);
  btnClose.addEventListener("click", closeLightbox);
  backdrop.addEventListener("click", closeLightbox);

  // tastiera
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowRight") {
      showNext();
    } else if (event.key === "ArrowLeft") {
      showPrev();
    }
  });
});
