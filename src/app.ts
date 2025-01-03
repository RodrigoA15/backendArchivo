import express from "express";
import cors from "cors";
import routes from "./routes/index.routes";
import errorMiddleware from "./middlewares/errors.middleware";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
app.use(errorMiddleware);

export default app;
    