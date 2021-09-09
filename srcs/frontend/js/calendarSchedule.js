const dates = document.querySelectorAll(".calendar__date-info");
const form = document.querySelector(".calendar__schedule-form");
const text = document.querySelector("input");
const btn = form.querySelector("button");

let currDate;

const addEvent = (e) => {
    currDate = e.target.dataset.date;
}

dates.forEach((date) => {
    date.addEventListener("click", addEvent);
})

const handleBtn = (e) => {
    e.preventDefault();
    fetch("/calendar/schedule", {
        method: "POST",
        body: {
            text: text.value,
            date: currDate,
        }
    })
}

btn.addEventListener("click", handleBtn);