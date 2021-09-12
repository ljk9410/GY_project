import express from 'express';
import { calendar, createSchedule, deleteSchedule } from '../controllers/apiController';

const apiRouter = express.Router();

apiRouter.get("/", calendar);
apiRouter.post("/schedule", createSchedule);
apiRouter.delete("/schedule/delete", deleteSchedule);

export default apiRouter;