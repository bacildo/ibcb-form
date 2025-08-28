import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import ibcb from "../assets/ibcb.jpg";
import Button from "../components/Button";
import ErrorsInput from "../components/ErrorsInput";
import Input from "../components/Input";
import { loginSchema } from "../schemas/Login";
import { loginUser } from "../services/User";
import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

function getPayload(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();
  const location = useLocation();
  const [errorsApi, setErrorsApi] = useState("");

  async function handleForm(data) {
    setErrorsApi("");
    try {
      const resp = await loginUser(data);
      const { token, mustChangePassword } = resp.data;
      Cookies.set("token", token, { expires: 1 });

      if (mustChangePassword) {
        navigate("/admin/first-access", { replace: true });
      } else {
        const from = location.state?.from?.pathname || "/admin";
        navigate(from, { replace: true });
      }
    } catch {
      setErrorsApi("Credenciais inválidas");
    }
  }

  // já logado? decide destino pelo token
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    const payload = getPayload(token);
    if (!payload) return;

    if (payload.mcp) {
      navigate("/admin/first-access", { replace: true });
    } else {
      const from = location.state?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    }
  }, [navigate, location.state]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-[45rem] flex flex-col items-center gap-6">
        <img src={ibcb} alt="" className="w-24 opacity-90" />
        <h1 className="text-3xl font-bold text-center">Área administrativa</h1>
        <div className="text-sm text-gray-300 bg-gray-800/40 border border-gray-700 px-3 py-1 rounded-full">
          Acesso restrito — use suas credenciais de administrador
        </div>

        {errorsApi && <ErrorsInput message={errorsApi} />}

        <form onSubmit={handleSubmit(handleForm)} className="flex flex-col items-stretch gap-4 w-full text-2xl">
          <div>
            <Input
              type="text"
              placeholder="Usuário"
              register={register}
              name="name"
              className="bg-white text-black w-full"
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Senha"
              register={register}
              name="password"
              className="bg-white text-black w-full"
              disabled={isSubmitting}
            />
            {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-base">
            <Link to="#" className="opacity-50 pointer-events-none select-none">
              {" "}
            </Link>
          </div>

          <Button
            type="submit"
            title={isSubmitting ? "Entrando..." : "Entrar"}
            className="bg-white text-black font-semibold"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}
