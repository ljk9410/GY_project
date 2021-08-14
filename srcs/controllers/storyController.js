import Story from "../models/Story";

export const storyHome = (req, res) => {
    res.render("story/home");
}

export const getCreate = (req, res) => {
    res.render("story/create");
}

export const postCreate = async (req, res) => {
    const files = req.files;
    const { title, desc } = req.body   

    try {
        const story = await Story.create({
            fileUrl:Story.filePath(files),
            title:title,
            desc:desc,
        });
        story.save();
        return res.redirect("/story");
    } catch(error) {
        // error가 떴을 때 error message를 render 해줄 페이지 새로 만들기
        return res.status(400).render("story/create",{
            errorMessage:error._message,
        })
    }
}