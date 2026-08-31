import { aboutCitys } from "../data/aboutCitys";
import { navItems } from "../data/navItems";

export const state = {
  slider: {
    currentSlide: 0,
    totalSlides: aboutCitys.length,
  },
  anchorScrollEl: {
    currentAnchor: 1,
    totalAnchors: navItems.length,
  },
};
