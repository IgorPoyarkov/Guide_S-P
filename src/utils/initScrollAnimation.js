export default function initScrollAnimation(
  selector = "._anim-item",
  animationClass = "_animated",
) {
  const defaultObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
    {

    },
  );

  const strictObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.8,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  document.querySelectorAll(selector).forEach((item) => {
    if (item.classList.contains("map-city__picture")) {
      strictObserver.observe(item);
    } else {
      defaultObserver.observe(item);
    }
  });
}
