import Notice from "../models/Notice"

// DB의 notice contents를 목록으로 전부 표시
// Paging 기술이 필요할 듯
export const noticeHome = async (req, res) => {
    const notices = await Notice.find({}).sort({ createdAt:"desc" });

    res.render("notice/home", { notices });
}

// 목록의 글을 선택했을 때 그 글을 보여주는 페이지
// id를 이용해 DB와 연동해서 해당 글을 보여주기
export const showNoticeContent = async (req, res) => {
    const { id } = req.params;
    const notice = await Notice.findById(id);
    
    res.render("notice/content", { notice });
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
        // error가 떴을 때 error message를 render 해줄 페이지 새로 만들기
        return res.status(400).render("notice/create",{
            errorMessage:error._message,
        })
    }
}

export const getUpdate = async (req, res) => {
    const { id } = req.params;
    const notice = await Notice.findById(id);

    res.render("notice/update", { notice });
}

export const postUpdate = async (req, res) => {
    const { id } = req.params;
    const { title, desc } = req.body;

    await Notice.findByIdAndUpdate(id, 
    {
        title:title,
        desc:desc,
        // 작성시간은 수정을 해도 바뀌지 않는게 좋을듯
    });
    
    res.redirect(`/notice/${id}`);
}

export const deleteNoticeContent = async (req, res) => {
    const { id } = req.params;
    
    await Notice.findByIdAndDelete(id);
    res.redirect(`/notice`);
}