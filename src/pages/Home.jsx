import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Página Home</h1>
      <p>Bem-vindo, admin! Aqui você pode acessar todos os registros.</p>
      <button
        onClick={() => {
          navigate("/all-messages"); // Usa navigate para navegar para all-messages
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Ver Mensagens
      </button>
    </div>
  );
};

export default Home;
