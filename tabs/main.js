import Tabs from "./tabs";
const fillDatePicker = (selectDays, selectMonths, selectYears) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const days = Array.from({ length: 31 }).map((_, i) => i + 1);
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth();
  const currDate = new Date().getDate();
  const years = Array.from({ length: 20 }).map((_, i) => currYear + i - 10);

  days.forEach((d, i) => {
    selectDays.options[i] = new Option(d, d, false, d === currDate);
  });

  months.forEach((m, i) => {
    selectMonths.options[i] = new Option(m, m, false, i === currMonth);
  });

  years.forEach((y, i) => {
    selectYears.options[i] = new Option(y, y, false, y === currYear);
  });
};

(() => {
  const form = document.querySelector("form");
  const daysInput = [...document.querySelectorAll("input[name=day]")];
  const selectDays = document.querySelector("select#days");
  const selectMonths = document.querySelector("select#months");
  const selectYears = document.querySelector("select#years");
  const userInput = document.getElementById("input");
  const resultInput = document.getElementById("result");
  const appState = {
    selectedTab: 0
  };

  const onTabChange = tabNum => {
    appState.selectedTab = tabNum;
  };
  // initialize Tabs
  Tabs(onTabChange);
  fillDatePicker(selectDays, selectMonths, selectYears);

  form.addEventListener("submit", e => {
    e.preventDefault();
    const value = {
      0: () => {
        return daysInput
          .reduce((res, d) => (d.checked ? [...res, d.value] : res), [])
          .join(", ");
      },
      1: () => {
        return `${selectDays.value}/${selectMonths.value}/${selectYears.value}`;
      },
      2: () => {
        return userInput.value;
      }
    };

    const result = value[appState.selectedTab]();
    resultInput.value = result;
  });
})();
