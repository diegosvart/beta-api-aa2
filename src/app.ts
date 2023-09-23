/**
 * Inicia APP
 */

import "dotenv/config.js"; //ARGUMENTOS DE APP
import express from "express";
import cors from "cors";
import { router } from "./routes";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`App activa en puerto: ${PORT}`));

