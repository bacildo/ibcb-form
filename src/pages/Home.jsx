import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Home</h1>
        <p className="text-lg mb-4">
          Bem-vindo, admin! Aqui você pode acessar todos os registros.
        </p>
        <Button
          type="submit"
          title="Mensagens"
          onClick={() => {
            navigate("/all-messages");
          }}
        />
      </div>
    </div>
  );
};

export default Home;
