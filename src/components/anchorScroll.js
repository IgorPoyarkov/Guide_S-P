import { state } from "../state/state";
import createSvgIcon from "../utils/createSvgIcon";
import { scrollToAnchor } from "../utils/anchorObserver";

export default function anchorScrollCreate() {
  const anchorScrollEl = document.createElement("div");
  anchorScrollEl.classList.add("anchor-scroll", "anchor-scroll--load");

  const titleEl = document.createElement("h3");
  titleEl.classList.add("visually-hidden");
  titleEl.textContent = "Кнопка навигации по секциям вверх и вниз";

  const topArrowBtn = document.createElement("button");
  topArrowBtn.classList.add(
    "anchor-scroll__icon",
    "anchor-scroll__icon--top",
    "btn",
  );

  topArrowBtn.addEventListener("click", () => {
    if (state.anchorScrollEl.currentAnchor > 1) {
      if (
        state.anchorScrollEl.currentAnchor === state.anchorScrollEl.totalAnchors
      ) {
        state.anchorScrollEl.currentAnchor =
          state.anchorScrollEl.currentAnchor - 2;
      } else {
        state.anchorScrollEl.currentAnchor--;
      }
      scrollToAnchor();
    }
  });

  const topArrowSvg = createSvgIcon("arrow-left");
  topArrowBtn.append(topArrowSvg);

  const bottomArrowBtn = document.createElement("button");
  bottomArrowBtn.classList.add(
    "anchor-scroll__icon",
    "anchor-scroll__icon--bottom",
    "btn",
  );
  bottomArrowBtn.addEventListener("click", () => {
    if (
      state.anchorScrollEl.currentAnchor < state.anchorScrollEl.totalAnchors
    ) {
      state.anchorScrollEl.currentAnchor++;
      scrollToAnchor();
    }
  });

  const bottomArrowSvg = createSvgIcon("arrow-right");
  bottomArrowBtn.append(bottomArrowSvg);

  const toHeaderBtn = document.createElement("button");
  toHeaderBtn.classList.add(
    "anchor-scroll__to",
    "anchor-scroll__to-header",
    "btn",
  );

  toHeaderBtn.addEventListener("click", () => {
    state.anchorScrollEl.currentAnchor = 1;
    scrollToAnchor();
  });

  const toFooterBtn = document.createElement("button");
  toFooterBtn.classList.add(
    "anchor-scroll__to",
    "anchor-scroll__to-footer",
    "btn",
  );

  toFooterBtn.addEventListener("click", () => {
    state.anchorScrollEl.currentAnchor = state.anchorScrollEl.totalAnchors;
    scrollToAnchor();
  });

  anchorScrollEl.append(
    titleEl,
    toHeaderBtn,
    topArrowBtn,
    bottomArrowBtn,
    toFooterBtn,
  );
  return anchorScrollEl;
}
