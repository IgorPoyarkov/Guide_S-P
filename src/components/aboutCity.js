import { state } from "../state/state";
import asset from "../utils/asset";
import createSvgIcon from "../utils/createSvgIcon";
import { handlerSlider } from "../utils/updateSlider";
import anchorScrollCreate from "./anchorScroll";

export default function aboutCityCreate(aboutCitys = [], id) {
  const containerEl = document.createElement("div");
  containerEl.classList.add("container");

  const aboutCityEl = document.createElement("div");
  aboutCityEl.classList.add("about-city");
  aboutCityEl.id = id;

  const titleEl = document.createElement("h2");
  titleEl.classList.add("about-city__title", "_anim-item");
  titleEl.innerHTML = "О&nbsp;городе";

  const sliderWrapperEl = document.createElement("div");
  sliderWrapperEl.classList.add("about-city__slider-wrapper", "_anim-item");

  const aboutCityList = document.createElement("ul");
  aboutCityList.classList.add("about-city__list");

  aboutCitys.forEach((item, index) => {
    const aboutCityItem = document.createElement("li");
    aboutCityItem.classList.add("about-city__item");

    const sliderEl = document.createElement("div");
    sliderEl.classList.add("slider-about");
    sliderEl.dataset.index = index;

    const imgEl = document.createElement("img");
    imgEl.classList.add("slider-about__img");
    imgEl.src = asset(item.src);
    imgEl.alt = item.alt;

    const sliderTextEl = document.createElement("p");
    sliderTextEl.classList.add("slider-about__text");
    sliderTextEl.innerHTML = item.text;

    sliderEl.append(imgEl, sliderTextEl);
    aboutCityItem.append(sliderEl);
    aboutCityList.append(aboutCityItem);
  });

  const sliderIndicatorEl = document.createElement("div");
  sliderIndicatorEl.classList.add("about-city__indicator-wrapper");

  for (let index = 0; index < aboutCitys.length; index++) {
    const indicatorEl = document.createElement("span");
    indicatorEl.classList.add("about-city__indicator");
    index === state.slider.currentSlide &&
      indicatorEl.classList.add("about-city__indicator--active");

    indicatorEl.dataset.index = index;
    sliderIndicatorEl.append(indicatorEl);
  }

  const leftArrowBtn = document.createElement("button");
  leftArrowBtn.classList.add(
    "about-city__icon",
    "about-city__icon--left",
    "btn",
  );

  leftArrowBtn.addEventListener("click", (e) => {
    handlerSlider(4, aboutCityList, sliderIndicatorEl);
  });

  const leftArrowSvg = createSvgIcon("arrow-left");
  leftArrowBtn.append(leftArrowSvg);

  const rightArrowBtn = document.createElement("button");
  rightArrowBtn.classList.add(
    "about-city__icon",
    "about-city__icon--right",
    "btn",
  );

  rightArrowBtn.addEventListener("click", (e) => {
    handlerSlider(2, aboutCityList, sliderIndicatorEl);
  });

  const rightArrowSvg = createSvgIcon("arrow-right");
  rightArrowBtn.append(rightArrowSvg);

  sliderWrapperEl.append(
    aboutCityList,
    sliderIndicatorEl,
    leftArrowBtn,
    rightArrowBtn,
  );
  aboutCityEl.append(titleEl, sliderWrapperEl, anchorScrollCreate());
  containerEl.append(aboutCityEl);

  return containerEl;
}
