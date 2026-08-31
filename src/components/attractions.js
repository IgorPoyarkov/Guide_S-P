export default function attractionsCreate(attractionsArr = [], id) {
  const containerEl = document.createElement("div");
  containerEl.classList.add("container");

  const attractionsEl = document.createElement("div");
  attractionsEl.classList.add("attractions");
  attractionsEl.id = id;

  const titleEl = document.createElement("h2");
  titleEl.classList.add("attractions-title", "_anim-item");
  titleEl.textContent = "Достопримечательности";

  const textEl = document.createElement("p");
  textEl.classList.add("attractions-text", "_anim-item");
  textEl.innerHTML =
    "Санкт-Петербург&nbsp;&mdash; город, который известен своими красивыми зданиями, музеями и&nbsp;парками. Это один из&nbsp;самых красивых городов России, который привлекает миллионы туристов каждый год. В&nbsp;этой статье мы&nbsp;расскажем о&nbsp;самых знаменитых достопримечательностях Санкт-Петербурга.";

  const attractionsWrapperEl = document.createElement("div");
  attractionsWrapperEl.classList.add("attractions-wrapper");

  const attractionsListEl = document.createElement("ul");

  attractionsListEl.classList.add("attractions-list");

  attractionsArr.forEach((item) => {
    const attractionsItemEl = document.createElement("li");
    attractionsItemEl.classList.add("attractions-item", "_anim-item");

    const sightEl = document.createElement("div");
    sightEl.classList.add("sight");

    const sightTitleEl = document.createElement("p");
    sightTitleEl.classList.add("sight-title");
    sightTitleEl.textContent = item.title;

    const pictureEl = document.createElement("div");
    pictureEl.classList.add("sight-picture");

    const imgEl = document.createElement("img");
    imgEl.classList.add("sight-img");
    imgEl.src = item.src;
    imgEl.alt = item.alt;

    const sightWrapperEl = document.createElement("div");
    sightWrapperEl.classList.add("sight-wrapper");

    item.description.forEach((description) => {
      const sightDescriptionEl = document.createElement("p");
      sightDescriptionEl.classList.add("sight-description");
      sightDescriptionEl.innerHTML = description;
      sightWrapperEl.append(sightDescriptionEl);
    });

    pictureEl.append(imgEl);
    sightEl.append(sightTitleEl, pictureEl, sightWrapperEl);
    attractionsItemEl.append(sightEl);
    attractionsListEl.append(attractionsItemEl);
  });

  attractionsWrapperEl.append(attractionsListEl);

  attractionsEl.append(titleEl, textEl, attractionsWrapperEl);
  containerEl.append(attractionsEl);

  return containerEl;
}
