export const noticeHome = (req, res) => {
    // DB의 notice contents를 목록으로 전부 표시
    // Paging 기술이 필요할 듯
    res.render("notice/home");
}

export const showNoticeContent = (req, res) => {
    // 목록의 글을 선택했을 때 그 글을 보여주는 페이지
    // id를 이용해 DB와 연동해서 해당 글을 보여주기
    console.log(req.params);
    res.render("notice/content");
}

export const createNoticeContent = (req, res) => {
    res.render("notice/create");
}

export const updateNoticeContent = (req, res) => {
    res.render("notice/update");
}
export const deleteNoticeContent = (req, res) => {
}