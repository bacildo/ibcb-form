import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function ThankYou() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/messages");
  };

  const handleExit = () => {
    navigate("/login");
  };

  return (
    <main className="flex flex-col items-center justify-center bg-black rounded p-8 w-[60rem] h-[25rem] text-2xl gap-2">
      <h1 className="text-white text-center mb-8">
        Obrigado pelo envio da mensagem! Caso deseje enviar para mais alguém clique em voltar, ou clique em sair para voltar ao login.
      </h1>
      <div className="flex gap-6">
        <Button type="button" title="Voltar" onClick={handleBack} />
        <Button type="button" title="Sair" onClick={handleExit} />
      </div>
      <footer className="mt-auto">
        <p className="text-gray-300 text-sm mt-4">
          Nos siga em nossas redes sociais para saber mais sobre nós! Será um prazer recebê-lo!
        </p>
        <div className="flex flex-col gap-1 text-center">
          <a href="https://www.instagram.com/ibcbangu/" className="text-gray-300 text-sm hover:text-white">Instagram</a>
          <a href="https://www.youtube.com/@ibcbangu" className="text-gray-300 text-sm hover:text-white">YouTube</a>
        </div>
      </footer>
    </main>
  );
}
