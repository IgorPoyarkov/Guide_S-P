export default function navigationCreate(navItems = []) {
  const navEl = document.createElement("nav");
  navEl.classList.add("navigation", "_anim-item");
  const navList = document.createElement("ul");
  navList.classList.add("navigation-list");

  navItems.forEach((item) => {
    if (item.visibility) {
      const navItem = document.createElement("li");

      navItem.classList.add("navigation-item");

      const navLink = document.createElement("a");
      navLink.classList.add("navigation-link");
      navLink.setAttribute("href", `#${item.id}`);

      navLink.innerHTML = item.name;
      navItem.append(navLink);
      navList.append(navItem);
    }
  });

  navEl.append(navList);
  return navEl;
}
