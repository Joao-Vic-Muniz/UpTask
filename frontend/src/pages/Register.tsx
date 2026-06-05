import { useState } from "react";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAtuh";

export function Register() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      console.error(error.response?.data);

      alert(
        error.response?.data?.error ||
        "Erro ao criar conta"
      );
    }
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-8 sm:p-16">
      {/* Elementos decorativos de fundo (blobs) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />

      <section
        className="
        relative
        z-10
        w-full
        max-w-md
        bg-card/80
        backdrop-blur-md
        border
        border-border/60
        rounded-3xl
        p-10
        sm:p-14
        my-8
        sm:my-12
        shadow-[0_8px_30px_rgb(0,0,0,0.12)]
      "
      >
        {/* Cabeçalho do Card */}
        <div className="mb-12 text-center sm:text-left">
          <span
            className="
            text-primary
            text-xs
            tracking-[0.4em]
            uppercase
            font-bold
          "
          >
            TaskFlow
          </span>

          <h1
            className="
            mt-6
            text-4xl
            sm:text-5xl
            font-extrabold
            tracking-tight
            text-text
          "
          >
            Criar Conta
          </h1>

          <p className="mt-4 text-sm sm:text-base text-text-muted leading-relaxed">
            Organize sua rotina e alcance suas metas.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text/80 px-1">Nome</label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="
              w-full
              h-16
              px-5
              rounded-2xl
              bg-background/50
              border
              border-border
              text-text
              placeholder:text-text-muted/60
              focus:outline-none
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
              transition-all
              duration-200
            "
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text/80 px-1">E-mail</label>
            <input
              type="email"
              placeholder="seuemail@gmail.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
              w-full
              h-16
              px-5
              rounded-2xl
              bg-background/50
              border
              border-border
              text-text
              placeholder:text-text-muted/60
              focus:outline-none
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
              transition-all
              duration-200
            "
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text/80 px-1">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
              w-full
              h-16
              px-5
              rounded-2xl
              bg-background/50
              border
              border-border
              text-text
              placeholder:text-text-muted/60
              focus:outline-none
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
              transition-all
              duration-200
            "
            />
          </div>

          <button
            type="submit"
            className="
            w-full
            h-16
            mt-8
            rounded-2xl
            bg-primary
            hover:bg-primary-hover
            text-white
            font-semibold
            shadow-lg
            shadow-primary/20
            hover:shadow-xl
            hover:shadow-primary/30
            hover:-translate-y-0.5
            active:translate-y-0
            transition-all
            duration-200
          "
          >
            Criar Conta
          </button>
        </form>

        {/* Rodapé do Card */}
        <div className="mt-10 pt-8 border-t border-border/40 text-center flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
          <span className="text-text-muted">Já possui uma conta?</span>
          <Link
            to="/login"
            className="
            text-primary
            font-bold
            hover:text-primary-hover
            transition-colors
            relative
            after:absolute
            after:bottom-0
            after:left-0
            after:w-full
            after:h-[1px]
            after:bg-primary
            after:scale-x-0
            hover:after:scale-x-100
            after:transition-transform
            after:duration-200
          "
          >
            Entrar
          </Link>
        </div>
      </section>
    </main>
  );
}