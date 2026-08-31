import navigationCreate from "./navigation";

export default function footerCreate(navItems = []) {
  const footerEl = document.createElement("div");
  footerEl.classList.add("footer");
  footerEl.id = navItems[7].id;

  const containerEl = document.createElement("div");
  containerEl.classList.add("container");

  const footerRightEl = document.createElement("div");
  footerRightEl.classList.add("footer-right");

  const footerLeftEl = document.createElement("div");
  footerLeftEl.classList.add("footer-left");

  const copyrightEl = document.createElement("span");
  copyrightEl.classList.add("footer-copyright");

  copyrightEl.innerHTML = "&copy;&nbsp;2023";

  const confidentialityEl = document.createElement("span");
  confidentialityEl.classList.add("footer-confidentiality");
  confidentialityEl.textContent = "Политика конфиденциальности";

  footerRightEl.append(navigationCreate(navItems));
  footerLeftEl.append(copyrightEl, confidentialityEl);
  footerEl.append(footerLeftEl, footerRightEl);
  containerEl.append(footerEl);
  return containerEl;
}
