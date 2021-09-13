import express from 'express';
import pug from 'pug';
import session from "express-session";
import rootRouter from './routers/rootRouter';
import noticeRouter from './routers/noticeRouter';
import storyRouter from './routers/storyRouter';
import apiRouter from './routers/apiRouter';
import { localsMiddleware } from './middlewares';

const app = express();

app.set("view engine", "pug");
app.set("views", "srcs/views");
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use(session({
    secret: 'Hello',
    resave: true,
    saveUninitialized: true,
}))
app.use(localsMiddleware);

// Routers
app.use("/", rootRouter);
app.use("/notice", noticeRouter);
app.use("/story", storyRouter)
app.use("/calendar", apiRouter);
export default app;
