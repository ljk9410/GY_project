import express from "express";
import { 
    getCreate,
    postCreate, 
    noticeHome, 
    showNoticeContent, 
    updateNoticeContent,
    deleteNoticeContent 
} from "../controllers/noticeController";

const noticeRouter = express.Router();

noticeRouter.get("/", noticeHome);
noticeRouter.route("/create").get(getCreate).post(postCreate);
// ([0-9a-f]{24}) => DB에서 자동적으로 부여하는 id 를 사용하기 위해 나중에 작성
noticeRouter.get("/:id([0-9a-f]{24})", showNoticeContent);
noticeRouter.get("/:id([0-9a-f]{24})/update", updateNoticeContent);
noticeRouter.get("/:id([0-9a-f]{24})/delete", deleteNoticeContent);

export default noticeRouter;