import express from 'express';
import { noticeView } from '../controllers/apiController';

const apiRouter = express.Router();

apiRouter.post("/notice/:id([0-9a-f]{24})/view", noticeView);

export default apiRouter;