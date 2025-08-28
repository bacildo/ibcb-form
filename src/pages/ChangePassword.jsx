import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ErrorsInput from "../components/ErrorsInput";
import { changePassword } from "../services/User";

export default function ChangePassword() {
  const [oldPassword, setOld] = useState("");
  const [newPassword, setNew] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      return setErr("A nova senha deve ter pelo menos 8 caracteres.");
    }
    if (newPassword !== confirm) {
      return setErr("Senhas não conferem.");
    }

    try {
      const token = Cookies.get("token");
      const { data } = await changePassword(token, oldPassword, newPassword);
      Cookies.set("token", data.token, { expires: 1 });
      navigate("/admin");
    } catch {
      setErr("Falha ao alterar senha.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-[45rem]">
        <h1 className="text-3xl font-bold text-center mb-8">Alterar senha</h1>
        {err && <ErrorsInput message={err} />}
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-2">Senha atual</label>
            <input
              className="p-2 rounded w-full bg-white text-black"
              type="password"
              value={oldPassword}
              onChange={(e) => setOld(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2">Nova senha</label>
            <input
              className="p-2 rounded w-full bg-white text-black"
              type="password"
              value={newPassword}
              onChange={(e) => setNew(e.target.value)}
              required
              minLength={8}
            />
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-300">Mínimo 8 caracteres</span>
              <span className={`${newPassword.length >= 8 ? "text-green-400" : "text-gray-400"}`}>
                {newPassword.length}/8
              </span>
            </div>
          </div>

          <div>
            <label className="block mb-2">Confirmar nova senha</label>
            <input
              className="p-2 rounded w-full bg-white text-black"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <Button type="submit" title="Salvar" className="bg-white text-black" />
        </form>
      </div>
    </div>
  );
}
