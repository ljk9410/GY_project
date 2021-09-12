import regeneratorRuntime from "regenerator-runtime";

let today = new Date();
let calendarDate = new Date();


// Calendar 그리기 함수
function buildCalendar() {
    let currentYear = calendarDate.getFullYear();
    let currentMonth = calendarDate.getMonth();

    // 현재 달 첫날 마지막날, 전 달 마지막날 구하기
    let prevLastDay = new Date(currentYear, currentMonth, 0);
    let currentFirstDay = new Date(currentYear, currentMonth, 1);
    let currentLastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // title 채우기
    document.querySelector('.calendar__year-title').innerHTML = `${currentYear}년`;
    document.querySelector('.calendar__month-title').innerHTML = `${currentMonth + 1}월 `;
    

    // date 데이터 채우기
    let dates = [];
    
    // 전 달 표시하기
    let prevRemain = currentFirstDay.getDay();
    
    if (prevRemain != 0) {
        for (let i = 0; i < prevRemain; i++) {
            dates.unshift(prevLastDay.getDate() - i);
        }
    }
    
    // 현재 달 표시하기
    for (let i = 1; i <= currentLastDay.getDate(); i++) {
        dates.push(i);
    }
    
    // 다음 달 표시하기
    let nextRemain = 42 - dates.length;
    
    for (let i = 1; i <= nextRemain; i++) {
        dates.push(i);
    }
    
    // html 채우기
    let htmlDates = "";
    let i = 0;

    let dataYear = currentYear;
    let dataMonth = currentMonth + 1;

    while (i < prevRemain) {
        let dateData = `${dataYear}-${dataMonth - 1 ? dataMonth - 1 : 12}-${dates[i]}`;
        htmlDates += `
        <div class="calendar__date-info noCurrent" data-date="${dateData}">
            <div class="calendar__date-info-num">${dates[i]}</div>
            <ul class="calendar__date-info-schedule"></ul>
        </div>
        `
        i++;
    }

    while (i < 42 - nextRemain) {
        let dateData = `${dataYear}-${dataMonth}-${dates[i]}`;
        if (
            today.getDate() === dates[i] &&
            today.getMonth() === calendarDate.getMonth() &&
            today.getFullYear() === calendarDate.getFullYear()
            ) {
            htmlDates += `
            <div class="calendar__date-info today" data-date="${dateData}">
                <div class="calendar__date-info-num">${dates[i]}</div>
                <ul class="calendar__date-info-schedule"></ul>
            </div>
            `
        }
        else {
            htmlDates += `
            <div class="calendar__date-info" data-date="${dateData}">
                <div class="calendar__date-info-num">${dates[i]}</div>
                <ul class="calendar__date-info-schedule"></ul>
            </div>
            `
        }
        i++;
    }
    
    while (i < 42) {
        let dateData = `${dataYear}-${dataMonth + 1 === 13 ? 1 : dataMonth + 1}-${dates[i]}`;
        htmlDates += `
        <div class="calendar__date-info noCurrent" data-date="${dateData}">
            <div class="calendar__date-info-num">${dates[i]}</div>
            <ul class="calendar__date-info-schedule"></ul>
        </div>
        `
        i++;
    }
    
    document.querySelector('.calendar__date-container').innerHTML = htmlDates;
}

// modal handler
function handleModal() {
    const dateInfo = document.querySelectorAll(".calendar__date-info");
    const hidden = document.querySelector(".hidden");
    const overlay = document.querySelector(".calendar__schedule-form-overlay");

    const drawCalendarModal = (e) => {
        const modalTitle = document.querySelector(".calendar__schedule-form-modal-title");
        const date = e.target.dataset.date;
        const title = `${(date || '').split("-")[0]}년 ${(date || '').split("-")[1]}월 ${(date || '').split("-")[2]}일`
        const scheduleList = document.querySelector(".calendar__schedule-modal-list");
        const scheduleListItems = e.target.querySelectorAll("li");
        let htmls = '';

        if (scheduleListItems.length) {
            scheduleListItems.forEach(item => {
                htmls += `<li>${item.innerHTML}</li>`;
            })
        }
        scheduleList.innerHTML = htmls;
        modalTitle.innerText = title;
        hidden.classList.remove("hidden");
    }

    const closeModal = () => {
        hidden.classList.add("hidden");
    }

    dateInfo.forEach((date) => {
        date.addEventListener("click", drawCalendarModal);
    })
    overlay.addEventListener("click", closeModal);
}
 


// server에 form data 넘기기
let currDate;

const getScheduleDate = () => {
    const dates = document.querySelectorAll(".calendar__date-info");
    const addEvent = (e) => {
        currDate = e.target.dataset.date;
    }
    dates.forEach((date) => {
        date.addEventListener("click", addEvent);
    })    
}

const form = document.querySelector(".calendar__schedule-form");
const text = document.querySelector("input");
const btn = form.querySelector("button");

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
    console.log(text.value);
    text.value = "";
}


// 일정 추가 기능

function handleSchedules() {
    const schedules = document.querySelectorAll(".scheduleData");
    const info = document.querySelectorAll(".calendar__date-info");
    
    info.forEach(info => {
        const scheduleContainer = info.querySelector(".calendar__date-info-schedule");
        let htmls = '';
        schedules.forEach(schedule => {
            if (info.dataset.date === schedule.dataset.date) {
                htmls += `
                <li data-id="${schedule.dataset.id}">
                    ${schedule.dataset.text}
                    <span data-id="${schedule.dataset.id}" class="schedule-deleteBtn">❌</span>
                </li>`;
            }
        })
        if (htmls !== '')
            scheduleContainer.innerHTML = htmls;
    })
}


// delete handler
function handleDeleteBtn() {
    const deleteBtn = document.querySelectorAll(".schedule-deleteBtn");

    const handleDelete = async(e) => {
        e.stopPropagation();
        e.target.parentNode.remove();
        const id = e.target.dataset.id;

        await fetch("/calendar/schedule/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id:id }),
        })
    }

    deleteBtn.forEach(btn => {
        btn.addEventListener("click", handleDelete);
    })
}



// button handler
const prevBtn = document.querySelector('.calendar__btn-prev');
const nextBtn = document.querySelector('.calendar__btn-next');

const prevBtnHandler = () => {
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    buildCalendar();
    handleModal();
    getScheduleDate();
    btn.removeEventListener("click", handleSubmit);
    btn.addEventListener("click", handleSubmit);
    handleSchedules();
    handleDeleteBtn()
}
const nextBtnHandler = () => {
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    buildCalendar();
    handleModal();
    getScheduleDate();
    btn.removeEventListener("click", handleSubmit);
    btn.addEventListener("click", handleSubmit);
    handleSchedules();
    handleDeleteBtn()
}





buildCalendar();
handleModal();
getScheduleDate();
handleSchedules();
handleDeleteBtn()
prevBtn.addEventListener('click', prevBtnHandler);
nextBtn.addEventListener('click', nextBtnHandler);
btn.addEventListener("click", handleSubmit);




