import aboutCityCreate from "../components/aboutCity";
import headerCreate from "../components/header";
import historyCreate from "../components/history";
import informationBlockCreate from "../components/informationBlock";
import attractionsCreate from "../components/attractions";
import budgetCreate from "../components/budget";
import { aboutCitys } from "../data/aboutCitys";
import { informationBlocks } from "../data/informationBlocks";
import { navItems } from "../data/navItems";
import { historys } from "../data/historys";
import { attractionsArr } from "../data/attractionsArr";
import { budgets } from "../data/budgets";
import mapCityCreate from "../components/mapCity";
import footerCreate from "../components/footer";
import initScrollAnimation from "./initScrollAnimation";
import initAnchorObserver from "./anchorObserver";

export default function render() {
  const appEl = document.querySelector(".app");
  appEl.append(
    headerCreate(navItems),
    aboutCityCreate(aboutCitys, navItems[1].id),
    informationBlockCreate(informationBlocks, navItems[2].id),
    historyCreate(historys, navItems[3].id),
    attractionsCreate(attractionsArr, navItems[4].id),
    budgetCreate(budgets, navItems[5].id),
    mapCityCreate(navItems[6].id),
    footerCreate(navItems),
  );
  initScrollAnimation();
  initAnchorObserver();
  return appEl;
}
