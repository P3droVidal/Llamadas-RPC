import * as express from "express";
import * as cors from "cors";
import corsOptions from "./config/corsOptions";
import consul from "./routes/Consultas";

const api = express();

api.use("/consul", cors(corsOptions), consul);

export default api;
