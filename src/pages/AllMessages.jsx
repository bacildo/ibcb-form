import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { deleteMessage, getAllMessages } from "../services/Messages";
import { IoTrash, IoPrint } from "react-icons/io5";
import Modal from "../components/Modal";
import ErrorsInput from "../components/ErrorsInput";
import jsPDF from "jspdf";
import "jspdf-autotable";

function AllMessages() {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorsApi, setErrorsApi] = useState("");
  const [messageIdToDelete, setMessagesIdToDelete] = useState(null);
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

  async function handleDelete(id) {
    try {
      await deleteMessage(id);
      setMessages(messages.filter((message) => message._id !== id));
      setShowConfirmModal(false);
    } catch (error) {
      setErrorsApi(error.message);
      console.error(error.message);
    }
  }

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
        <td className="flex items-center">
          <IoPrint
            onClick={() => generatePDF(message)}
            className="cursor-pointer text-blue-500 hover:text-blue-600 mr-2 mt-4"
          />
          <IoTrash
            onClick={() => {
              setShowConfirmModal(true);
              setMessagesIdToDelete(message._id);
            }}
            className="cursor-pointer text-red-500 hover:text-red-600 mt-4"
          />
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
        {errorsApi && <ErrorsInput message={errorsApi} />}

        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Registro de Mensagens
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border-b">Nome</th>
                  <th className="p-3 border-b">Destinatário</th>
                  <th className="p-3 border-b">Mensagem</th>
                  <th className="p-3 border-b">Criado em</th>
                  <th className="p-3 border-b">Ações</th>
                </tr>
              </thead>
              <tbody>{displayMessages}</tbody>
            </table>
            <Modal
              isOpen={showConfirmModal}
              onClose={() => setShowConfirmModal(false)}
              onConfirm={() => handleDelete(messageIdToDelete)}
            />
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
