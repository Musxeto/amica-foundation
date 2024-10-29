import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { FaSearch, FaSortAmountDown, FaSpinner } from "react-icons/fa";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch messages from Firebase Firestore
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "messages"));
        const fetchedMessages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      } catch (error) {
        toast.error("Failed to load messages.");
        console.error("Error fetching messages: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // Open modal with selected message details
  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  // Filter and sort messages
  const filteredMessages = messages
    .filter((msg) => {
      const term = searchTerm.toLowerCase();
      return (
        msg.subject.toLowerCase().includes(term) ||
        msg.name.toLowerCase().includes(term) ||
        msg.email.toLowerCase().includes(term) ||
        msg.message.toLowerCase().includes(term)
      );
    })
    .sort((a, b) =>
      sortAsc
        ? a.subject.localeCompare(b.subject)
        : b.subject.localeCompare(a.subject)
    );

  return (
    <div>
      <AdminNavbar />
      <ToastContainer />
      <div className="p-8 bg-raisin-black-2 mt-16 min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-6 text-buff-500">Messages</h1>

        {/* Search and Sort Controls */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            className="px-4 py-2 rounded bg-raisin-black-200 text-white w-full"
            placeholder="Search by subject"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="flex items-center gap-2 px-4 py-2 rounded bg-buff-500 text-gray-900"
            onClick={() => setSortAsc(!sortAsc)}
          >
            <FaSortAmountDown /> Sort {sortAsc ? "Desc" : "Asc"}
          </button>
        </div>

        {/* Messages List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-buff-500" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => openModal(msg)}
                className="bg-raisin-black-400 text-white rounded-lg shadow-md p-5 hover:shadow-lg cursor-pointer transition-all duration-200 transform hover:scale-105"
              >
                <h2 className="text-xl font-semibold text-buff-500">
                  {msg.subject}
                </h2>
                <p className="text-gray-400">From: {msg.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Message Details */}
        {isModalOpen && selectedMessage && (
          <div className="fixed inset-0 bg-raisin-black-2 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-raisin-black-200 rounded-lg p-6 max-w-lg w-full mx-4">
              <h2 className="text-2xl font-bold text-buff-500 mb-4">
                {selectedMessage.subject}
              </h2>
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {selectedMessage.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedMessage.email}
              </p>
              <p>
                <span className="font-semibold">School:</span>{" "}
                {selectedMessage.school || "N/A"}
              </p>
              <p className="mt-4">
                <span className="font-semibold">Message:</span>{" "}
                {selectedMessage.message}
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-6 px-4 py-2 bg-buff-500 text-gray-900 rounded hover:bg-buff-600 w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
