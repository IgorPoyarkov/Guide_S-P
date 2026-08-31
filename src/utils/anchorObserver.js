import { state } from "../state/state";
import { navItems } from "../data/navItems";

export default function initAnchorObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionIndex = navItems.findIndex(
            (item) => item.id === entry.target.id,
          );

          if (sectionIndex !== -1) {
            state.anchorScrollEl.currentAnchor = sectionIndex + 1;

            const anchorScroll = document.querySelector(".anchor-scroll");

            switch (true) {
              case state.anchorScrollEl.currentAnchor > 1 &&
                state.anchorScrollEl.currentAnchor < 8:
                anchorScroll.classList.remove(
                  "anchor-scroll--load",
                  "anchor-scroll--header",
                  "anchor-scroll--footer",
                );
                break;

              case state.anchorScrollEl.currentAnchor === 1:
                anchorScroll.classList.add("anchor-scroll--header");
                break;

              case state.anchorScrollEl.currentAnchor === 8:
                anchorScroll.classList.add("anchor-scroll--footer");
                break;
              default:
                break;
            }
          }
        }
      });
    },
    { threshold: 0.5 },
  );

  navItems.forEach((item) => {
    const section = document.getElementById(item.id);
    if (section) observer.observe(section);
  });
}

export function scrollToAnchor() {
  const targetId = navItems[state.anchorScrollEl.currentAnchor - 1].id;
  const targetSection = document.getElementById(targetId);

  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
