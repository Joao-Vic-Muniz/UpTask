import "dotenv/config";

import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// rotas
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});