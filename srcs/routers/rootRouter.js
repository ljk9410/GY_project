import express from 'express';
import { aboutUs, home } from '../controllers/rootController';

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/about-us", aboutUs)

export default rootRouter;