import express from 'express';
import pug from 'pug';
import rootRouter from './routers/rootRouter';
import noticeRouter from './routers/noticeRouter';
import storyRouter from './routers/storyRouter';

const app = express();

app.set("view engine", "pug");
app.set("views", "srcs/views");
app.use(express.urlencoded({ extended:true }));

// Routers
app.use("/", rootRouter);
app.use("/notice", noticeRouter);
app.use("/story", storyRouter)
export default app;
