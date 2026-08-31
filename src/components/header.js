import navigationCreate from "./navigation";

export default function headerCreate(navItems = []) {
  const headerEl = document.createElement("div");
  headerEl.classList.add("header");
  headerEl.id = navItems[0].id;

  const containerEl = document.createElement("div");
  containerEl.classList.add("container");

  const imgEl = document.createElement("img");
  imgEl.classList.add("header-img");
  imgEl.src = "../../public/Foto_Main.png";
  imgEl.alt = "Главное фото";

  const navEl = navigationCreate(navItems);

  const titleEl = document.createElement("h1");
  titleEl.classList.add("header-title", "_anim-item");

  titleEl.innerHTML = "Путеводитель по&nbsp;Санкт-Петербургу";

  const textEl = document.createElement("p");
  textEl.classList.add("header-text", "_anim-item");
  textEl.textContent = "Рассказываем самое интересное";

  headerEl.append(navEl, imgEl, titleEl, textEl);
  containerEl.append(headerEl);
  return containerEl;
}
