import express from "express";
import { 
    createNoticeContent, 
    noticeHome, 
    showNoticeContent, 
    updateNoticeContent,
    deleteNoticeContent 
} from "../controllers/noticeController";

const noticeRouter = express.Router();

noticeRouter.get("/", noticeHome);
noticeRouter.get("/create", createNoticeContent);
// ([0-9a-f]{24}) => DB에서 자동적으로 부여하는 id 를 사용하기 위해 나중에 작성
noticeRouter.get("/:id", showNoticeContent);
noticeRouter.get("/:id/update", updateNoticeContent);
noticeRouter.get("/:id/delete", deleteNoticeContent);

export default noticeRouter;