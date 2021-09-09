import express from 'express';
import { calendar, createSchedule } from '../controllers/apiController';

const apiRouter = express.Router();

apiRouter.get("/", calendar);
apiRouter.post("/schedule", createSchedule);

export default apiRouter;