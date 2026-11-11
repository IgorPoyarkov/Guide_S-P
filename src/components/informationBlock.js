import asset from "../utils/asset";

export default function informationBlockCreate(informationBlocks = [], id) {
  const informationBlockEl = document.createElement("div");
  informationBlockEl.classList.add("information-block");
  informationBlockEl.id = id;

  const containerEl = document.createElement("div");
  containerEl.classList.add("container");

  const titleEl = document.createElement("h2");
  titleEl.classList.add("visually-hidden");
  titleEl.ariaLabel = "Рекомендации для путешествия";

  const textEl = document.createElement("p");
  textEl.classList.add("information-block__text", "_anim-item");

  textEl.innerHTML =
    "В&nbsp;этом путеводителе мы&nbsp;расскажем о&nbsp;самых интересных местах Санкт-Петербурга, которые обязательно стоит посетить при поездке в&nbsp;этот прекрасный город.";

  informationBlocks.forEach((img) => {
    const imgEl = document.createElement("img");
    imgEl.classList.add(
      "information-block__img",
      `information-block__img--${img.position}`,
      "_anim-item",
    );
    imgEl.src = asset(img.src);
    imgEl.alt = img.alt;
    informationBlockEl.prepend(imgEl);
  });

  informationBlockEl.append(titleEl, textEl);
  containerEl.append(informationBlockEl);
  return containerEl;
}
