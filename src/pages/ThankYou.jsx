import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function ThankYou() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/messages");
  };

  return (
    <main className="flex flex-col items-center justify-center bg-zinc-900 rounded p-8 w-[60rem] h-[35rem] text-2xl">
      <h1 className="text-white">Obrigado pelo envio da mensagem!</h1>
      <Button type="button" title="Voltar" onClick={handleBack} />
    </main>
  );
}
