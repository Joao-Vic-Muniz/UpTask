import "dotenv/config";

import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// rotas
app.use("/api/users", userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});