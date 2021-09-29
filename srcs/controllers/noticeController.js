import Notice from "../models/Notice"

// DB의 notice contents를 목록으로 전부 표시
// Paging 기술이 필요할 듯
export const noticeHome = async (req, res) => {
    let { page } = req.query;
    
    if (!page)
        page = 1;

    function paging(page, totalPost) {
        const maxPost = 7;
        const maxPage = 5;
        let currentPage = page ? parseInt(page) : 1;
        const hidePost = page === 1 ? 0 : (page - 1) * maxPost;
        const totalPage = Math.ceil(totalPost / maxPost);

        if (currentPage > totalPage) {
            currentPage = totalPage;
        }

        const startPage = Math.floor(((currentPage - 1) / maxPage)) * maxPage + 1
        let endPage = startPage + maxPage - 1;

        if (endPage > totalPage) {
            endPage = totalPage;
        }

        return { startPage, endPage, hidePost, maxPost, totalPage, currentPage };
    }

    try {
        const totalPost = await Notice.countDocuments({});
        let {
            startPage,
            endPage,
            hidePost,
            maxPost,
            totalPage,
            currentPage
        } = paging(page, totalPost);

        const notices = await Notice.find({}).sort({ createdAt:"desc" })
            .skip(hidePost)
            .limit(maxPost);
        res.locals.currPage = page;
        res.render("notice/home", { notices, currentPage, startPage, endPage, maxPost, totalPage });

    } catch(error) {
        console.log(error);
        return res.status(400).render("notice/home",{
            errorMessage:error._message,
        })
    }
}

// 목록의 글을 선택했을 때 그 글을 보여주는 페이지
// id를 이용해 DB와 연동해서 해당 글을 보여주기
export const showNoticeContent = async (req, res) => {
    const { id } = req.params;
    const notice = await Notice.findById(id);
    
    res.render("notice/content", { notice });
}

export const getCreate = (req, res) => {
    if (!req.session.loggedIn)
        return res.status(401).redirect("/notice");
    return res.render("notice/create");
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

    if (!req.session.loggedIn)
        return res.status(401).redirect("/notice");
    return res.render("notice/update", { notice });
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
    
    if (!req.session.loggedIn)
        return res.status(401).redirect("/notice");
    await Notice.findByIdAndDelete(id);
    return res.redirect(`/notice`);
}