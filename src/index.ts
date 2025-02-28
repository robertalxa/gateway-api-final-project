import express, { Router } from "express";
import cors from "cors";
import config from "./config.json";
import autorRoutes from "./routes/autor.routes";

const app = express();

app.use(cors());
app.use(express.json());

const routes = Router();
routes.use("/api/v1/autor", autorRoutes);

app.use(routes);
app.listen(config.serverPort, () => {
  console.log(`Server Listening on ${config.serverPort}`);
});
