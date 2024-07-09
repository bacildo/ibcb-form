import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    if (message.split(" ").length > 3000) {
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
    <main className="flex flex-col items-center justify-center bg-zinc-900 rounded p-8 w-[60rem] h-[35rem] text-2xl">
      {errorsApi && <ErrorsInput message={errorsApi} />}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col">
          <label className="text-white">Nome completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white">Destinatário</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="p-2 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white">Mensagem</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 rounded"
            rows="10"
            required
          />
        </div>
        <Button type="submit" title="Enviar" />
      </form>
    </main>
  );
}
