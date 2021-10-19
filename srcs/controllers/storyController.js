import Story from "../models/Story";
import AWS from 'aws-sdk';

export const storyHome = async (req, res) => {
    const stories = await Story.find({}).sort({ createdAt:"desc" });;

    return res.render("story/home", { stories });
}

export const getCreate = (req, res) => {
    if (!req.session.loggedIn)
        return res.status(401).redirect("/story");
    return res.render("story/create");
}

export const postCreate = async (req, res) => {
    const files = req.files;
    const { title, desc } = req.body   

    console.log(files);
    try {
        const story = await Story.create({
            fileUrl:Story.fileLocation(files),
            title:title,
            desc:desc,
        });
        story.save();
        return res.redirect("/story");
    } catch(error) {
        // error가 떴을 때 error message를 render 해줄 페이지 새로 만들기
        console.log(error);
        return res.status(400).render("story/create",{
            errorMessage:error._message,
        })
    }
}

export const showContents = async (req, res) => {
    const { id } = req.params;
    const story = await Story.findById(id);

    res.render("story/content", { story });
}

export const getUpdate = async (req, res) => {
    const { id } = req.params;
    const story = await Story.findById(id);

    if (!req.session.loggedIn)
        return res.status(401).redirect("/story");
    return res.render("story/update", { story });
}
export const postUpdate = (req, res) => {
    res.end();
}

export const deleteContent = async (req, res) => {
    const { id } = req.params;
    const story = await Story.findById(id);
    // let s3 = new AWS.S3();
    let s3 = new AWS.S3({
        credentials: {
          accessKeyId: process.env.AWS_ID,
          secretAccessKey: process.env.AWS_PASSWORD, 
        },
      });

    for (let i = 0; i < story.fileUrl.length; i++) {
        s3.deleteObject({
            Bucket: 'cau-gy',
            Key: story.fileUrl[i].substring(32),
        }, (err, data) => {
            if (err) { throw err; }
            console.log('s3 deleteObject', err);
        })
    }
    await Story.findByIdAndDelete(id);

    if (!req.session.loggedIn)
        return res.status(401).redirect("/story");
    return res.redirect(`/story`);
}