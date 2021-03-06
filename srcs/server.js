import express from 'express';
import pug from 'pug';
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from './routers/rootRouter';
import noticeRouter from './routers/noticeRouter';
import storyRouter from './routers/storyRouter';
import calendarRouter from './routers/calendarRouter';
import apiRouter from './routers/apiRouter';
import { localsMiddleware } from './middlewares';

const app = express();


app.set("view engine", "pug");
app.set("views", "srcs/views");
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("images"));
app.use("/assets", express.static("assets"));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000, // 1일 뒤 cookie 만료
    },
    store: MongoStore.create({ 
        mongoUrl:process.env.DB_URL,
    })
}))
app.use(localsMiddleware);
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "ETag");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
    );
  res.header(
    "Access-Control-Allow-Headers",
    "*"
    );
    next();
});


// Routers
app.use("/", rootRouter);
app.use("/notice", noticeRouter);
app.use("/story", storyRouter);
app.use("/calendar", calendarRouter);
app.use("/api", apiRouter);

export default app;
