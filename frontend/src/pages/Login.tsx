import { useState } from "react";
import { useAuth } from "../hooks/useAtuh";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await signIn(email, password);
      navigate("/dashboard");

      alert("Login realizado!");
    } catch {
      alert("Erro ao fazer login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
        <h1 className="text-3xl font-bold">Login</h1>

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

        <button className="bg-black text-white p-2">Entrar</button>


        <Link to="/" className="text-center text-blue-600">
          Não possui conta? Cadastre-se
        </Link>
      </form>
    </div>
  );
}
