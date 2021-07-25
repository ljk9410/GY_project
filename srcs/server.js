import express from 'express';
import pug from 'pug';
import rootRouter from './routers/rootRouter';

const app = express();

app.set("view engine", "pug");
app.set("views", "srcs/views");

app.use("/", rootRouter);

export default app;