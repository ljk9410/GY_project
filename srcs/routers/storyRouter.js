import express from "express";
import { storyHome, getCreate, postCreate, showContents, getUpdate, postUpdate, deleteContent } from "../controllers/storyController";
import { storyUpload } from "../middlewares";

const storyRouter = express.Router();

storyRouter.get("/", storyHome);
storyRouter.route("/create").get(getCreate).post(storyUpload.array('photo'), postCreate);
storyRouter.get("/:id([0-9a-f]{24})", showContents);
storyRouter.route("/:id([0-9a-f]{24})/update").get(getUpdate).post(postUpdate);
storyRouter.get("/:id([0-9a-f]{24})/delete", deleteContent);
export default storyRouter;