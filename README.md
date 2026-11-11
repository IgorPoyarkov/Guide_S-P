# Guide_S-P — лендинг-путеводитель по Санкт-Петербургу

Одностраничник-путеводитель на чистом JavaScript: карусель, якорная навигация и
анимации появления по скроллу. В `package.json` — только Vite и Sass,
ни одной зависимости в рантайме.

**Демо:** https://igorpoyarkov.github.io/Guide_S-P/

## Возможности

- восемь экранов и десять модулей: шапка, навигация, информационный блок, «О городе»,
  история, достопримечательности, бюджет, карта, якорное меню, подвал;
- карусель «О городе»: зацикливание в обе стороны, индикаторы подсвечивают текущий слайд;
- плавающая кнопка навигации: шаг вверх/вниз по секциям и переход в шапку и подвал;
- боковое якорное меню: активный пункт подсвечивается сам по мере скролла, клик —
  плавный переход к секции;
- меню меняет оформление на границах страницы (в шапке и у подвала);
- анимации появления по скроллу на `IntersectionObserver`, каждая проигрывается один раз;
- контент не размечен в HTML — он лежит в данных и рендерится компонентами;
- иконки из SVG-спрайта, шрифты (Prata, Raleway) подключены локально, без Google Fonts.

## Ключевые решения

### 1. Контент и структура страницы отделены от разметки

У каждой секции — своя функция-компонент, которая только строит DOM, и рядом файл
данных. Тексты правит не программист:

```
src/components/aboutCity.js      ->  src/data/aboutCitys.js
src/components/attractions.js    ->  src/data/attractionsArr.js
src/components/history.js        ->  src/data/historys.js
src/components/navigation.js     ->  src/data/navItems.js
```

`navItems` при этом описывает не только меню, а всю карту страницы: у блока есть
`id`-якорь и флаг, показывать ли его в навигации. Шапка, инфо-блок и подвал —
полноценные якорные секции, которых в меню нет:

```js
export const navItems = [
  { name: "Header", id: "header", visibility: false },
  { name: "О&nbsp;городе", id: "about-city", visibility: true },
  { name: "Информационный блок", id: "information-block", visibility: false },
  /* ... */
  { name: "Footer", id: "footer", visibility: false },
];
```

Один массив кормит и меню, и наблюдатель секций, поэтому пункт меню и отслеживаемый
блок не могут разойтись.

### 2. Анимация появления: наблюдатель отключается после срабатывания

Скролл-анимации не должны считать пересечения весь просмотр страницы. Как только
элемент появился, класс добавлен, а наблюдатель от него отвязывается:

```js
const defaultObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
);
```

`rootMargin: "0px 0px -40px 0px"` подрезает область отслеживания на 40 px снизу:
анимация стартует не в тот момент, когда элемент только показался из-за нижнего края
экрана, а когда он поднялся чуть выше. Иначе первые кадры проигрываются незамеченными,
за пределами вьюпорта.

Наблюдателей два, с разными порогами: обычный — 0.15, и строгий — 0.8 для крупной
карты, которая должна показаться полностью, прежде чем начнёт появляться. Выбор идёт
по классу элемента, а не отдельным вызовом:

```js
document.querySelectorAll(selector).forEach((item) => {
  if (item.classList.contains("map-city__picture")) {
    strictObserver.observe(item);
  } else {
    defaultObserver.observe(item);
  }
});
```

### 3. Якорная навигация: активный пункт вычисляется из индекса секции

Один наблюдатель с порогом 0.5 следит за всеми секциями, а активный пункт находится
поиском по `navItems` — привязка «секция ↔ пункт меню» существует в одном месте:

```js
const sectionIndex = navItems.findIndex((item) => item.id === entry.target.id);

if (sectionIndex !== -1) {
  state.anchorScrollEl.currentAnchor = sectionIndex + 1;
}
```

Плюс к этому у меню три визуальных состояния: обычное, на фоне шапки и на фоне подвала.
Переключаются классами по номеру активной секции:

```js
case currentAnchor > 1 && currentAnchor < 8:
  anchorScroll.classList.remove("anchor-scroll--load",
    "anchor-scroll--header", "anchor-scroll--footer");
  break;
case currentAnchor === 1:
  anchorScroll.classList.add("anchor-scroll--header");
  break;
case currentAnchor === 8:
  anchorScroll.classList.add("anchor-scroll--footer");
  break;
```

Клик по пункту — родовой `scrollIntoView`, без библиотек плавного скролла:

```js
targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
```

Тот же `currentAnchor` обслуживает плавающую кнопку с четырьмя действиями — шаг
вверх, шаг вниз, в шапку и в подвал. Кнопке не нужно знать геометрию страницы:
прокрутка целиком выводится из номера активной секции, а её номер уже считает
наблюдатель:

```js
bottomArrowBtn.addEventListener("click", () => {
  if (state.anchorScrollEl.currentAnchor < state.anchorScrollEl.totalAnchors) {
    state.anchorScrollEl.currentAnchor++;
    scrollToAnchor();
  }
});
```

Один источник истины даёт и подсветку меню, и кнопки перехода, и смену оформления —
поэтому они не могут начать противоречить друг другу.

### 4. Карусель без библиотек — на одном `translateX`

Слайдер — это `transform: translateX(-currentSlide * 100%)`, то есть браузер
анимирует только трансформацией, без перерасчёта layout:

```js
aboutCityList.style.transform = `translateX(-${state.slider.currentSlide * 100}%)`;
```

Сама прокрутка и подсчёт активного индикатора вынесены из компонента в `updateSlider`,
компонент только передаёт ссылки на DOM:

```js
export function updateSlider(aboutCityList, sliderIndicator) {
  if (!aboutCityList) return;
  aboutCityList.style.transform = `translateX(-${state.slider.currentSlide * 100}%)`;

  if (sliderIndicator) {
    const indicators = sliderIndicator.querySelectorAll(
      ".about-city__indicator",
    );
    indicators.forEach((btn, index) => {
      if (index === state.slider.currentSlide) {
        btn.classList.add("about-city__indicator--active");
      } else {
        btn.classList.remove("about-city__indicator--active");
      }
    });
  }
}
```

Зацикливание — через границу в обе стороны, поэтому с третьего слайда «вперёд»
возвращаешься к первому:

```js
case "right":
  if (state.slider.currentSlide < state.slider.totalSlides - 1) {
    state.slider.currentSlide += steps;
  } else {
    state.slider.currentSlide = 0;
  }
  break;

case "left":
  if (state.slider.currentSlide > 0) {
    state.slider.currentSlide -= steps;
  } else {
    state.slider.currentSlide = state.slider.totalSlides - 1;
  }
  break;
```

Количество слайдов не подставляется в условие константой — `totalSlides` считается из
данных, так что ещё один слайд в `aboutCitys.js` не требует правки логики.

### 5. Состояние — отдельный маленький модуль

Весь стейт приложения — два числа с производными границами, и живут они не в
замыканиях компонентов, чтобы обработчики из разных файлов видели одно и то же:

```js
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
```

Границы (`totalSlides`, `totalAnchors`) считаются из данных, а не пишутся руками, —
и это единственное место, где длина списка вычислена правильно.

### 6. Иконки через `<use>`

Один спрайт и функция-хелпер, вместо того чтобы вставлять `path` руками в каждой секции;
размер и цвет иконки берутся из CSS, потому что это живой DOM-узел, а не `<img>`.

## Что улучшил бы

1. **~5.6 МБ PNG в `public/`** (главный экран — 1.4 МБ, «О городе» — 2.2 МБ, карта —
   0.7 МБ) без WebP/AVIF и без `loading="lazy"`. На 4G это несколько секунд белой
   страницы; самое тяжёлое нужно грузить в первую очередь, остальное — по мере
   приближения к секции.
2. **В `anchorObserver.js` количество секций задано литералами** — `currentAnchor < 8`
   и `=== 8`, — хотя `state.anchorScrollEl.totalAnchors` уже посчитан из
   `navItems.length`. Добавишь секцию: `state` обновится сам, а меню по-прежнему будет
   считать последней восьмую.
3. **Порядок секций приходится держать в двух местах.** `render()` вызывает компоненты
   в своём порядке и передаёт якорь по индексу — `aboutCityCreate(aboutCitys, navItems[1].id)`,
   `historyCreate(historys, navItems[3].id)`. Переставишь строку в `navItems`, не
   тронув `render()`, — секции молча получат чужие якоря. Правильно передавать сам
   объект `navItems[i]` или искать по `id`.
4. **Половина конфига слайдера не работает.** В `sliderConfig` четыре направления —
   `top`, `right`, `bottom`, `left`, — но в `switch` обработаны только `right` и `left`;
   `top` и `bottom` падают в `default: break`. Конфиг с `steps: 1` у всех слайдов
   создаёт иллюзию настройки, которой нет.
5. **Точки-индикаторы карусели не работают.** `aboutCityCreate` проставляет каждому
   индикатору `dataset.index`, но обработчика клика у них нет — это `<span>` без
   слушателя. Из-за этого и ветка «прыжок к слайду» в `handlerSlider` недостижима:

   ```js
   if (actionId > sliderConfig.length) {
     state.slider.currentSlide = actionId - (sliderConfig.length + 1);
     /* ... */
   }
   ```

   Индикаторы сейчас честно показывают текущий слайд, но обещают больше, чем умеют.

6. **Стрелки карусели вызывают обработчик числом.** `handlerSlider(4)` для «назад» и
   `handlerSlider(2)` для «вперёд» — соответствие с `sliderConfig` держится в голове
   автора. Ровно то место, где обычная сигнатура `handlerSlider("prev")` дешевле
   любой магии.
7. **Зацикливание лучше записать остатком:** `(index + dir + total) % total` вместо
   веток с сравнениями — короче и не даёт выйти за границы при любом `steps`.
8. **У кнопки «вверх» из подвала есть необъяснимый частный случай:**
   `currentAnchor -= 2`, если текущая секция — последняя. Скорее всего это костыль
   вокруг того, что подвал — не контентная секция, но выглядит как опечатка в `-1`
   и требует комментария хотя бы в коде.
9. **Лишний третий аргумент в `IntersectionObserver`.** Конструктор принимает два;
   пустой объект `{}` третьим аргументом проигнорирован, но выглядит как
   несработавшая настройка.
10. **Нет `prefers-reduced-motion`.** Плавный скролл и появление блоков обязательны
    не всем.
11. **`state` — мутабельный синглтон без подписки.** Сейчас это работает, потому что
    состояние читается внутри обработчиков; но как только понадобится перерисовка по
    изменению, придётся добавлять подписку — то есть повторять то, что уже сделано
    в конвертере валют.
12. **Весь контент секций собирается JavaScript-ом**, в `index.html` — только
    корневой `div`. `<title>` и `<meta name="description">` в HTML есть, поэтому
    заголовок и сниппет поисковик возьмёт, но текст секций без JS не увидит ни
    поисковик, ни пользователь с отключённым JavaScript. Для лендинга, который должен
    находиться по запросу, правильнее отдавать первый экран статикой.

## Стек

Vanilla JS (ES-модули, `IntersectionObserver`, `scrollIntoView`) · Vite · Sass
(БЭМ, `_mixins` / `_variables`) · SVG-спрайт · локальные шрифты woff2

## Структура

```
├── index.html             корневой div + скрипт
├── public/                картинки по разделам: aboutCity/, attractions/, history/,
│                          budget/, mapCity/, svg/sprite.svg
└── src/
    ├── main.js            import стилей + render()
    ├── components/        по одному файлу на секцию (header, aboutCity,
    │                      attractions, history, budget, mapCity,
    │                      anchorScroll, footer, navigation, informationBlock)
    ├── data/              контент секций и navItems — порядок и якоря
    ├── state/             state.js — текущий слайд и активный якорь
    ├── utils/             render, updateSlider, initScrollAnimation,
    │                      anchorObserver, createSvgIcon
    ├── fonts/             Prata, Raleway (woff/woff2)
    └── scss/              global/ + blocks/ по числу секций
```

## Запуск

```bash
npm install
npm run dev
```

Сборка — `npm run build`, просмотр собранного — `npm run preview`.

## Про origin

Сделано самостоятельно, вне учебных курсов. Это тренировка вёрстки и «ручной» работы
с DOM: наблюдатели, прокрутка, трансформации — то, что в React обычно отдаётся
библиотеке, а здесь пишется напрямую и стоит нуля байт в бандле.
