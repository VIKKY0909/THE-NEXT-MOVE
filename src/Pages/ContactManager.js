import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch contacts from the API
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/contacts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setContacts(response.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Function to toggle read status
  const toggleReadStatus = async (contactId) => {
    try {
      const contact = contacts.find((c) => c._id === contactId);
      const response = await axios.put(
        `http://localhost:5000/api/contacts/${contactId}`,
        {
          isRead: !contact.isRead,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setContacts((prevContacts) =>
          prevContacts.map((c) =>
            c._id === contactId ? { ...c, isRead: !c.isRead } : c
          )
        );
      } else {
        throw new Error("Failed to update contact status");
      }
    } catch (err) {
      console.error("Error toggling read status:", err);
      setError("Error toggling read status");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-4">Contact List</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Message</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td className="border border-gray-300 px-4 py-2">{contact.firstName}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.lastName}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.message}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {contact.isRead ? (
                    <span className="text-green-600">Read</span>
                  ) : (
                    <span className="text-red-600">Not Read</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => toggleReadStatus(contact._id)}
                    className="text-blue-600 hover:underline"
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactManager;
