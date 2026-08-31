import { state } from "../state/state";

const sliderConfig = [
  { direction: "top", steps: 1 },
  { direction: "right", steps: 1 },
  { direction: "bottom", steps: 1 },
  { direction: "left", steps: 1 },
];

export function updateSlider(aboutCityList, sliderIndicator) {
  if (!aboutCityList) return;
  aboutCityList.style.transform = `translateX(-${state.slider.currentSlide * 100}%)`;

  if (sliderIndicator) {
    const indicators = sliderIndicator.querySelectorAll(
      ".about-city__indicator",
    );
    indicators.forEach((btn, index) => {
      if (index === state.slider.currentSlide) {
        btn.classList.add("about-city__indicator--active");
      } else {
        btn.classList.remove("about-city__indicator--active");
      }
    });
  }
}

export function handlerSlider(actionId, aboutCityList, sliderIndicator) {
  if (actionId > sliderConfig.length) {
    state.slider.currentSlide = actionId - (sliderConfig.length + 1);
    updateSlider(aboutCityList, sliderIndicator);
    return;
  }

  const configItem = sliderConfig[actionId - 1];
  const direction = configItem.direction;
  const steps = configItem.steps;

  switch (direction) {
    case "right":
      if (state.slider.currentSlide < state.slider.totalSlides - 1) {
        state.slider.currentSlide += steps;
      } else {
        state.slider.currentSlide = 0;
      }
      break;

    case "left":
      if (state.slider.currentSlide > 0) {
        state.slider.currentSlide -= steps;
      } else {
        state.slider.currentSlide = state.slider.totalSlides - 1;
      }
      break;

    default:
      break;
  }

  updateSlider(aboutCityList, sliderIndicator);
}
