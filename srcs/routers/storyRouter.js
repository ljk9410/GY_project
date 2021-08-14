import express from "express";
import { storyHome } from "../controllers/storyController";

const storyRouter = express.Router();

storyRouter.get("/", storyHome);

export default storyRouter;