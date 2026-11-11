import asset from "../utils/asset";

export default function mapCityCreate(id) {
  const mapCityEl = document.createElement("div");
  mapCityEl.classList.add("map-city");
  mapCityEl.id = id;

  const containerEl = document.createElement("div");
  containerEl.classList.add("container");

  const titleEl = document.createElement("h2");
  titleEl.classList.add("map-city__title", "_anim-item");
  titleEl.textContent = "Карта Петербурга";

  const pictureEl = document.createElement("div");
  pictureEl.classList.add("map-city__picture", "_anim-item");

  const imgEl = document.createElement("img");
  imgEl.classList.add("map-city__img");
  imgEl.src = asset("mapCity/mapCity.png");
  imgEl.alt = "Карта Санкт-Петербурга";

  let isDown = false;
  let startX;
  let scrollLeft;

  setTimeout(() => {
    pictureEl.scrollLeft = (1673 - pictureEl.clientWidth) / 2;
  }, 50);

  imgEl.draggable = false;

  pictureEl.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - pictureEl.offsetLeft;
    scrollLeft = pictureEl.scrollLeft;
  });

  window.addEventListener("mouseup", () => {
    isDown = false;
  });
  pictureEl.addEventListener("mouseleave", () => {
    isDown = false;
  });

  pictureEl.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    e.preventDefault();

    const x = e.pageX - pictureEl.offsetLeft;

    const walk = (x - startX) * 1.5;

    pictureEl.scrollLeft = scrollLeft - walk;
  });

  pictureEl.append(imgEl);

  mapCityEl.append(titleEl, pictureEl);
  containerEl.append(mapCityEl);
  return containerEl;
}
