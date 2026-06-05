import { useState } from "react";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAtuh";

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/users/register", {
        name,
        email,
        password,
      });

      await signIn(email, password);

      navigate("/dashboard");
    } catch (error: any) {
      console.log(error.response?.data);

      alert(JSON.stringify(error.response?.data, null, 2));
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
        <h1 className="text-3xl font-bold">Cadastro</h1>

        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />

        <button className="bg-black text-white p-2">Criar Conta</button>
        <Link to="/login" className="text-center text-blue-600">
          Já possui conta? Entrar
        </Link>
      </form>
    </div>
  );
}
