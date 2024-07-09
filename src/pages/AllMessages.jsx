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
    const tableColumn = ["Field", "Value"];
    const tableRows = [
      ["Name", message.name],
      ["Recipient", message.recipient],
      ["Message", message.message],
      ["Created At", new Date(message.created_at).toLocaleString()],
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "grid",
    });

    doc.text("Message Details", 14, 15);
    doc.save(`message_${message._id}.pdf`);
  };

  const displayMessages = messages
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    .map((message) => (
      <tr key={message._id} className="border-b border-gray-200">
        <td className="p-2">{message.name}</td>
        <td className="p-2">{message.recipient}</td>
        <td className="p-2">{message.message}</td>
        <td className="p-2">{new Date(message.created_at).toLocaleString()}</td>
        <td className="p-2">
          <button
            onClick={() => generatePDF(message)}
            className="bg-blue-500 text-white px-2 py-1 rounded"
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
    return <div>Loading messages...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Messages</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border-b">Nome</th>
            <th className="p-2 border-b">Destinatário</th>
            <th className="p-2 border-b">Mensagem</th>
            <th className="p-2 border-b">Criado em</th>{" "}
            <th className="p-2 border-b">PDF</th>{" "}
          </tr>
        </thead>
        <tbody>{displayMessages}</tbody>
      </table>
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
        activeClassName={"bg-blue-500 text-white px-3 py-1 rounded"}
        previousClassName={"mx-1"}
        nextClassName={"mx-1"}
      />
    </div>
  );
}

export default AllMessages;
