import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ErrorsInput from "../components/ErrorsInput";
import { changePassword } from "../services/User";

const MIN_LEN = 8;

export default function FirstAccess() {
  const [oldPassword, setOld] = useState("");
  const [newPassword, setNew] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (newPassword.length < MIN_LEN) {
      return setErr(`A nova senha deve ter pelo menos ${MIN_LEN} caracteres.`);
    }
    if (newPassword !== confirm) {
      return setErr("Senhas não conferem.");
    }

    try {
      const token = Cookies.get("token");
      const { data } = await changePassword(token, oldPassword, newPassword);
      // backend devolve novo token sem mcp
      Cookies.set("token", data.token, { expires: 1 });
      navigate("/admin", { replace: true });
    } catch (e2) {
      const apiMsg = e2?.response?.data?.message || e2?.message || "Não foi possível alterar a senha.";
      setErr(apiMsg);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-[40rem]">
        <h1 className="text-3xl font-bold text-center mb-6">Primeiro acesso</h1>

        {err && <ErrorsInput message={err} />}

        <form onSubmit={submit} className="flex flex-col gap-4 text-2xl">
          <div>
            <label className="block mb-2">Senha atual (temporária)</label>
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
              minLength={MIN_LEN}
            />
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-300">mínimo {MIN_LEN} caracteres</span>
              <span className={newPassword.length >= MIN_LEN ? "text-green-400" : "text-gray-400"}>
                {newPassword.length}/{MIN_LEN}
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

          <Button type="submit" title="Salvar" className="bg-white text-black font-semibold" />
        </form>
      </div>
    </div>
  );
}
