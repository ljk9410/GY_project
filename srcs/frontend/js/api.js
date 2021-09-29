import regeneratorRuntime from "regenerator-runtime";


// view api
const noticeItems = document.querySelectorAll('.notice__home-contents-item-link');

const handleView = async (e) => {
    const { id } = e.currentTarget.dataset;
    
    await fetch(`/api/notice/${id}/view`, {
        method:"POST"
    })
}

noticeItems.forEach(item => {
    item.addEventListener("click", handleView), true;
})

// notice pagination design
const paginationContainer = document.querySelector(".pagination-container");
const pages = paginationContainer.querySelectorAll(".page");
const currPage = paginationContainer.querySelector(".currPage");

pages.forEach(page => {
    if (page.dataset.page === currPage.innerHTML)
        page.classList.add("on");
})
