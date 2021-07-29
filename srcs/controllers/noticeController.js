import Notice from "../models/Notice"

export const noticeHome = async (req, res) => {
    // DB의 notice contents를 목록으로 전부 표시
    // Paging 기술이 필요할 듯
    const notices = await Notice.find({}).sort({ createdAt:"desc" });

    console.log(notices);
    res.render("notice/home", {notices});
}

export const showNoticeContent = (req, res) => {
    // 목록의 글을 선택했을 때 그 글을 보여주는 페이지
    // id를 이용해 DB와 연동해서 해당 글을 보여주기
    console.log(req.params);
    res.render("notice/content");
}

export const getCreate = (req, res) => {
    res.render("notice/create");
}

export const postCreate = async (req, res) => {
    const { title, desc } = req.body;

    try {
        const notice = await Notice.create({
            title:title,
            desc:desc,
        });

        notice.save();
        return res.redirect("/notice");
    } catch(error) {
        console.log(error);
        return res.status(400).render("notice/create",{
            errorMessage:error._message,
        })
    }
    // form에서 받은 데이터를 DB에 update
}

export const updateNoticeContent = (req, res) => {
    res.render("notice/update");
}
export const deleteNoticeContent = (req, res) => {
}