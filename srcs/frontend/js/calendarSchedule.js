import regeneratorRuntime from "regenerator-runtime";

function handleSchedule() {
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
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (text.value === "") {
            return ;
        }
        await fetch("/calendar/schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: text.value,
                date: currDate,
            })
        })
        text.value = "";
    }
    
    btn.addEventListener("click", handleSubmit);
}

export default handleSchedule;