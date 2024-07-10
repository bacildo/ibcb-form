import { Link, useNavigate } from "react-router-dom";
import ibcb from "../assets/ibcb.png";
import Button from "../components/Button";
import Input from "../components/Input";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsInput from "../components/ErrorsInput";
import { registerSchema } from "../schemas/Register";
import { registerUser } from "../services/User";
import { useState } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });
  const navigate = useNavigate();

  const [errorsApi, setErrorsApi] = useState("");

  async function handleForm(data) {
    try {
      await registerUser(data);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorsApi(error.response.data.message);
      } else {
        setErrorsApi("Usuário já cadastrado. Tente novamente!");
      }
    }
  
  }
  return (
    <div className="flex flex-col items-center justify-around bg-black rounded p-8 w-[35rem] h-[35rem] relative">
      <Link to="/login">
        <IoArrowBackCircleOutline className="text-white absolute top-3 left-3 text-2xl  hover:text-teal-200" />
      </Link>
      <img src={ibcb} alt="" className="w-44" />
      {errorsApi && <ErrorsInput message={errorsApi} />}
      
      <form
        onSubmit={handleSubmit(handleForm)}
        className="flex flex-col items-center justify-center gap-4 w-full text-2xl"
      >
        <Input type="text" placeholder="Nome" register={register} name="name" />
        {errors.name && <ErrorsInput message={errors.name.message} />}

        <Input
          type="password"
          placeholder="Senha"
          register={register}
          name="password"
        />
        {errors.password && <ErrorsInput message={errors.password.message} />}
        <Input
          type="password"
          placeholder="Confirmar Senha"
          register={register}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <ErrorsInput message={errors.confirmPassword.message} />
        )}
        <Button type="submit" title="Confirmar" />
      </form>
    </div>
  );
}
