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
