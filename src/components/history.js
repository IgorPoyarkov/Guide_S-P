export default function historyCreate(historys = [], id) {
  const historysWrapperEl = document.createElement("div");
  historysWrapperEl.classList.add("historys");
  historysWrapperEl.id = id;

  const containerEl = document.createElement("div");
  containerEl.classList.add("container");

  const titleEl = document.createElement("h2");
  titleEl.classList.add("historys-title");
  titleEl.textContent = "История";

  const historysListEl = document.createElement("ol");
  historysListEl.classList.add("historys-list");

  historys.forEach((item, index) => {
    const historysItemEl = document.createElement("li");
    historysItemEl.classList.add("historys-item", "_anim-item");

    const historyEl = document.createElement("div");

    index % 2 === 0
      ? historyEl.classList.add("history")
      : historyEl.classList.add("history", "history--left");

    const titleHistoryEl = document.createElement("h3");
    titleHistoryEl.classList.add("history-title");
    titleHistoryEl.innerHTML = item.title;

    const textHistoryEl = document.createElement("p");
    textHistoryEl.classList.add("history-text");
    textHistoryEl.innerHTML = item.text;

    const pictureEl = document.createElement("div");
    pictureEl.classList.add("history-picture");

    const imgEl = document.createElement("img");
    imgEl.classList.add("history-img");
    imgEl.src = item.src;
    imgEl.alt = item.alt;

    pictureEl.append(imgEl);

    historyEl.append(titleHistoryEl, textHistoryEl, pictureEl);

    historysItemEl.append(historyEl);
    historysListEl.append(historysItemEl);
  });
  historysWrapperEl.append(titleEl, historysListEl);
  containerEl.append(historysWrapperEl);
  return containerEl;
}
