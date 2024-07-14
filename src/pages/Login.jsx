import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ibcb from "../assets/ibcb.png";
import Button from "../components/Button";
import ErrorsInput from "../components/ErrorsInput";
import Input from "../components/Input";
import { loginSchema } from "../schemas/Login";
import { loginUser } from "../services/User";
import { useEffect, useState } from "react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();

  const [errorsApi, setErrorsApi] = useState("");

  async function handleForm(data) {
    try {
      const token = await loginUser(data);
      Cookies.set("token", token.data, { expires: 1 });
      const decodedToken = parseJwt(token.data);
      if (decodedToken.role === "admin") {
        navigate("/home");
      }
    } catch (error) {
      setErrorsApi(error.message);
    }
  }
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.error("Failed to parse JWT:", e);
      return {};
    }
  };

  useEffect(() => {
    Cookies.remove("token");
  });

  return (
    <div className="flex flex-col items-center justify-around bg-black rounded p-8 w-[35rem] h-[35rem] text-white relative">
      <img src={ibcb} alt="" className="w-44" />
      {errorsApi && <ErrorsInput message={errorsApi} />}

      <form
        onSubmit={handleSubmit(handleForm)}
        className="flex flex-col items-center justify-center gap-4 w-full text-2xl"
      >
        <Input
          type="text"
          placeholder="Nome"
          register={register}
          name="name"
          className="bg-white text-black"
        />
        {errors.name && <ErrorsInput message={errors.name.message} />}
        <Input
          type="password"
          placeholder="Senha"
          register={register}
          name="password"
          className="bg-white text-black"
        />
        {errors.password && <ErrorsInput message={errors.password.message} />}
        <Button type="submit" title="Login" className="bg-white text-black" />
      </form>
      <p className="text-white text-2xl">
        Não possui uma conta? {""}
        <Link to="/register" className="text-teal-300 hover:text-teal-200">
          Clique aqui!
        </Link>{" "}
      </p>
    </div>
  );
}
