import "dotenv/config";
import express from 'express';
import cors from 'cors';

import userRoutes from "./routes/userRoutes"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes)

app.get("/", (req, res) => {
    res.send("API funcionando!");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
});