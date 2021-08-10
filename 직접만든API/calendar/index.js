let today = new Date();
let calendarDate = new Date();

function buildCalendar() {
    let currentYear = calendarDate.getFullYear();
    let currentMonth = calendarDate.getMonth();
    // 현재 달 첫날 마지막날, 전 달 마지막날 구하기
    let prevLastDay = new Date(currentYear, currentMonth, 0);
    let currentFirstDay = new Date(currentYear, currentMonth, 1);
    let currentLastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // title 채우기
    document.querySelector('.year-title').innerHTML = `${currentYear}년`;
    document.querySelector('.month-title').innerHTML = `${currentMonth + 1}월 `;
    
    // date 데이터 채우기
    let dates = [];
    
    // 전 달 표시하기
    let prevRemain = currentLastDay.getDay();
    
    if (currentFirstDay.getDay() != 0) {
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
    
    while (i < prevRemain) {
        htmlDates += `<div class="date noCurrent">${dates[i]}</div>`;
        i++;
    }

    while (i < 42 - nextRemain) {
        if (
            today.getDate() === dates[i] &&
            today.getMonth() === calendarDate.getMonth() &&
            today.getFullYear() === calendarDate.getFullYear()
            ) {
            htmlDates += `<div class="date today">${dates[i]}</div>`;
        }
        else {
            htmlDates += `<div class="date">${dates[i]}</div>`;
        }
        i++;
    }
    
    while (i < 42) {
        htmlDates += `<div class="date noCurrent">${dates[i]}</div>`;
        i++;
    }
    
    document.querySelector('.date-container').innerHTML = htmlDates;
}

buildCalendar();

// button handler
let prevBtn = document.querySelector('.prev');
let nextBtn = document.querySelector('.next');

let prevBtnHandler = () => {
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    buildCalendar();
}
let nextBtnHandler = () => {
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    buildCalendar();
}

prevBtn.addEventListener('click', prevBtnHandler);
nextBtn.addEventListener('click', nextBtnHandler);
