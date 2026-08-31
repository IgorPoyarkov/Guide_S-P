import createSvgIcon from "../utils/createSvgIcon";

export default function budgetCreate(budgets = [], id) {
  const containerEl = document.createElement("div");
  containerEl.classList.add("container");

  const budgetEl = document.createElement("div");
  budgetEl.classList.add("budget");
  budgetEl.id = id;

  const titleEl = document.createElement("h2");
  titleEl.classList.add("budget-title", "_anim-item");
  titleEl.textContent = "Бюджет поездки";

  const textEl = document.createElement("p");
  textEl.classList.add("budget-text", "_anim-item");
  textEl.textContent =
    "Перед поездкой необходимо рассчитать приблизительный бюджет, который понадобится вам для путешествия.";

  const budgetWrapperEl = document.createElement("div");
  budgetWrapperEl.classList.add("budget-wrapper");

  const budgetListEl = document.createElement("ul");

  budgetListEl.classList.add("budget-list", "_anim-item");

  budgets.forEach((item, index) => {
    const budgetItemEl = document.createElement("li");
    budgetItemEl.classList.add("budget-item");

    const expensesEl = document.createElement("div");
    expensesEl.classList.add("expenses", `expenses--${item.svg}`);

    const svgEl = createSvgIcon(`budget${index + 1}`, "expenses-icon");

    const expensesTitleEl = document.createElement("p");
    expensesTitleEl.classList.add("expenses-title");
    expensesTitleEl.innerHTML = item.spending;

    const expensesPriceEl = document.createElement("p");
    expensesPriceEl.classList.add("expenses-price");
    expensesPriceEl.innerHTML = item.price;

    expensesEl.append(svgEl, expensesTitleEl, expensesPriceEl);
    budgetItemEl.append(expensesEl);
    budgetListEl.append(budgetItemEl);
  });

  budgetWrapperEl.append(budgetListEl);

  budgetEl.append(titleEl, textEl, budgetWrapperEl);
  containerEl.append(budgetEl);

  return containerEl;
}
