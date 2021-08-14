import express from "express";
import { storyHome, getCreate, postCreate } from "../controllers/storyController";
import { storyUpload } from "../middlewares";

const storyRouter = express.Router();

storyRouter.get("/", storyHome);
storyRouter.route("/create").get(getCreate).post(storyUpload.array('photo'), postCreate);
// storyRouter.route("/:id([0-9a-f]{24}")

export default storyRouter;