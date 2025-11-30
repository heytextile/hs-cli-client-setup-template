gsap.from(".brand-link__logo", {
  delay: 0.5,
  duration: 1,
  ease: "power2",
  x: "350px",
  opacity: 0,
});

let mm = gsap.matchMedia();

mm.add("(max-width: 600px)", () => {
  gsap.from(".brand-link__logo", {
    delay: 0.5,
    duration: 1,
    ease: "power2",
    y: "50px",
    opacity: 0,
  });
});
