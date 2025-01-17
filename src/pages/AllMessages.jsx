import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { getAllMessages } from "../services/Messages";
import jsPDF from "jspdf";
import "jspdf-autotable";

function AllMessages() {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await getAllMessages();
        setMessages(response);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages.");
      }
    }
    fetchMessages();
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const generatePDF = (message) => {
    const doc = new jsPDF();
    const tableRows = [
      ["Nome:", message.name],
      ["Destinatário:", message.recipient],
      ["Mensagem:", message.message],
    ];

    doc.autoTable({
      body: tableRows,
      startY: 20,
      theme: "plain",

    });

    
    doc.save(`message_${message.recipient}.pdf`);
  };

  const displayMessages = messages
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    .map((message) => (
      <tr key={message._id} className="border-b border-gray-200">
        <td className="p-3">{message.name}</td>
        <td className="p-3">{message.recipient}</td>
        <td className="p-3">{message.message}</td>
        <td className="p-3">{new Date(message.created_at).toLocaleString()}</td>
        <td className="p-3">
          <button
            onClick={() => generatePDF(message)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Generate PDF
          </button>
        </td>
      </tr>
    ));

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (messages.length === 0) {
    return <div>Carregando mensagens...</div>;
  }

  return (
    <div className="bg-black min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Registro de Mensagens</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border-b">Nome</th>
                  <th className="p-3 border-b">Destinatário</th>
                  <th className="p-3 border-b">Mensagem</th>
                  <th className="p-3 border-b">Criado em</th>
                  <th className="p-3 border-b">PDF</th>
                </tr>
              </thead>
              <tbody>{displayMessages}</tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(messages.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex justify-center mt-4"}
            pageClassName={"mx-1"}
            activeClassName={"bg-blue-500 text-white px-1 py-1"}
            previousClassName={"mx-1"}
            nextClassName={"mx-1"}
          />
        </div>
      </div>
    </div>
  );
}

export default AllMessages;
