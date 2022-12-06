"use-strict";
import data from "./data/data.json" assert { type: "json" };

// Elements

const periodChoices = document.querySelectorAll("a");
const titles = document.querySelectorAll("h2");
// const dataset = data;
// Global Scope Variables
let timeframe = "weekly";

const changeTimePeriod = () => {
  titles.forEach((title) => {
    const titleHead = title.textContent;
    data.find((el) => {
      if (el.title === titleHead) {
        const { timeframes } = el;
        const h3Elements = title.closest("div").querySelector("h3");
        const timeData = timeframes[timeframe].current;

        gsap.to(h3Elements, {
          innerText: +timeData.toFixed(0) + "hrs",
          duration: 2,
          stagger: 1,
          snap: {
            innerText: 1,
          },
        });
        let period =
          timeframe === "daily"
            ? "Yesterday"
            : timeframe === "weekly"
            ? "Last Week"
            : "Last Month";
        //

        const totalHours = title.closest("div").querySelector("span");
        console.log(totalHours);
        const hoursValue = +timeframes[timeframe].previous;
        const hoursTextContent = `${period} - ${hoursValue}hrs`;
        console.log(hoursValue, hoursTextContent);
        gsap.to(totalHours, {
          // innerText: period + " - " + +hoursValue.toFixed(0) + "hrs",
          innerText: hoursValue.toFixed(0),
          duration: 2,
          // stagger: 1,
          snap: {
            innerText: 1,
          },
        });
      }
    });
  });
};

// console.log(titles[0].closest("div").querySelector("h3"));

// console.log(periodChoices);

periodChoices.forEach((period) => {
  period.addEventListener("click", function (e) {
    e.preventDefault();
    const elements = period.closest("div").querySelectorAll("a");
    // console.log(elements);
    elements.forEach((element) => element.classList.remove("active"));
    this.classList.add("active");
    console.log(this.dataset.time);
    timeframe = this.dataset.time;
    changeTimePeriod();
  });
});
