import express from 'express';
import { calendar, createSchedule, deleteSchedule } from '../controllers/apiController';

const calendarRouter = express.Router();

calendarRouter.get("/", calendar);
calendarRouter.post("/schedule", createSchedule);
calendarRouter.delete("/schedule/delete", deleteSchedule);

export default calendarRouter;