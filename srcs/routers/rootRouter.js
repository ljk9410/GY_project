import express from 'express';
import { aboutUs, home, getLogin, postLogin } from '../controllers/rootController';

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/about-us", aboutUs);
rootRouter.route("/login").get(getLogin).post(postLogin);
export default rootRouter;