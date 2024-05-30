import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.routes"
const app = express();
app.use(morgan("dev"));
app.use(cors());

app.use(routes)

export default app;
