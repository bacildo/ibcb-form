import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ErrorsInput from "../components/ErrorsInput";
import { sendMessage } from "../services/Messages";

export default function MessageForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [errorsApi, setErrorsApi] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.split(" ").length > 7000) {
      setErrorsApi("A mensagem não pode exceder 3000 palavras.");
      return;
    }
    try {
      await sendMessage({ name, recipient, message });
      navigate("/thank-you");
    } catch (error) {
      setErrorsApi("Erro ao enviar mensagem.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-2xl">
      <Link to="/login" className="absolute top-3 left-0 flex flex-col items-center">
        <IoHome className="text-white text-2xl hover:text-teal-200" />
        <span className="text-white text-sm">administração</span>
      </Link>

      <div className="bg-black rounded p-8 w-[45rem] h-[50rem] flex flex-col items-center justify-center">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Digite sua mensagem
          </h1>
          {errorsApi && <ErrorsInput message={errorsApi} />}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-white">Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 rounded"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white">Destinatário</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="p-2 rounded"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white">Mensagem</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-2 rounded"
                rows="10"
                required
              />
            </div>
            <footer>A mensagem n</footer>
            <Button type="submit" title="Enviar" />
          </form>
        </div>
      </div>
    </div>
  );
}
