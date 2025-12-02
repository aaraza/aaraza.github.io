(() => {
  const carousels = document.querySelectorAll("[data-carousel]");
  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    if (!slides.length) return;

    const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    let currentIndex = Math.max(
      0,
      slides.findIndex((slide) => slide.classList.contains("is-active"))
    );
    if (currentIndex === -1) currentIndex = 0;

    const applyState = () => {
      slides.forEach((slide, index) => {
        const isActive = index === currentIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", isActive ? "false" : "true");
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === currentIndex);
      });
    };

    const goTo = (nextIndex) => {
      if (!slides.length) return;
      const targetIndex =
        (nextIndex + slides.length) % Math.max(slides.length, 1);
      if (targetIndex === currentIndex) return;

      resetVideo(slides[currentIndex]);
      currentIndex = targetIndex;
      applyState();
    };

    const playForSlide = (slide) => {
      if (!slide) return;
      const wrapper = slide.querySelector("[data-video-wrapper]");
      const player = slide.querySelector("[data-player]");
      const thumb = slide.querySelector("[data-thumb]");
      if (!wrapper || !player || !thumb) return;

      const videoId = wrapper.dataset.videoId;
      if (!videoId) return;

      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`;
      iframe.title = wrapper.dataset.title
        ? `${wrapper.dataset.title} video`
        : "Embedded video";
      iframe.width = "560";
      iframe.height = "315";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;

      player.innerHTML = "";
      player.appendChild(iframe);
      player.dataset.loaded = "true";
      thumb.classList.add("is-hidden");
      player.classList.add("is-visible");
    };

    slides.forEach((slide) => {
      const playButton = slide.querySelector("[data-play-video]");
      playButton?.addEventListener("click", () => playForSlide(slide));
    });

    prev?.addEventListener("click", () => goTo(currentIndex - 1));
    next?.addEventListener("click", () => goTo(currentIndex + 1));

    dots.forEach((dot) => {
      const index = Number.parseInt(dot.dataset.carouselDot || "", 10);
      if (Number.isNaN(index)) return;
      dot.addEventListener("click", () => goTo(index));
    });

    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(currentIndex + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(currentIndex - 1);
      }
    });

    // Initial state refresh
    applyState();
  });

  function resetVideo(slide) {
    if (!slide) return;
    const player = slide.querySelector("[data-player]");
    const thumb = slide.querySelector("[data-thumb]");

    if (player) {
      player.innerHTML = "";
      player.dataset.loaded = "false";
      player.classList.remove("is-visible");
    }

    if (thumb) {
      thumb.classList.remove("is-hidden");
    }
  }
})();
