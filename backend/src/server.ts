import "@prisma/config";
import "dotenv/config";
import express from 'express';
import cors from 'cors';
import userRoutes from "./routes/userRoutes"; 

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});