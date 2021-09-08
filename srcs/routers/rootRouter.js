import express from 'express';
import { aboutUs, home, calendar } from '../controllers/rootController';

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/about-us", aboutUs);
rootRouter.get("/calendar", calendar);

export default rootRouter;