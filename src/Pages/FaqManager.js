import React, { useState, useEffect } from 'react';

// FAQ Manager Component
const FaqManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [editFaq, setEditFaq] = useState(null);
  const [error, setError] = useState('');

  // Fetch all FAQs
  const fetchFaqs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/faqs');
      const data = await res.json();
      setFaqs(data);
    } catch (err) {
      console.error(err);
      setError('Error fetching FAQs');
    }
  };

  // Create a new FAQ
  const createFaq = async () => {
    if (!newFaq.question || !newFaq.answer) {
      setError('Question and Answer are required');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/faqs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add auth if needed
        },
        body: JSON.stringify(newFaq),
      });
      if (res.ok) {
        setNewFaq({ question: '', answer: '' });
        fetchFaqs();
        setError('');
      } else {
        const data = await res.json();
        setError(data.message || 'Error creating FAQ');
      }
    } catch (err) {
      console.error(err);
      setError('Error creating FAQ');
    }
  };

  // Update an FAQ
  const updateFaq = async () => {
    if (!editFaq.question || !editFaq.answer) {
      setError('Question and Answer are required');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/faqs/${editFaq._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editFaq),
      });
      if (res.ok) {
        setEditFaq(null);
        fetchFaqs();
        setError('');
      } else {
        const data = await res.json();
        setError(data.message || 'Error updating FAQ');
      }
    } catch (err) {
      console.error(err);
      setError('Error updating FAQ');
    }
  };

  // Delete an FAQ
  const deleteFaq = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/faqs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.ok) {
        fetchFaqs();
        setError('');
      } else {
        const data = await res.json();
        setError(data.message || 'Error deleting FAQ');
      }
    } catch (err) {
      console.error(err);
      setError('Error deleting FAQ');
    }
  };

  // Handle edit click
  const handleEditClick = (faq) => {
    setEditFaq(faq);
  };

  // Handle cancel edit
  const cancelEdit = () => {
    setEditFaq(null);
  };

  // Fetch FAQs on component mount
  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">FAQ Manager</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* New FAQ Form */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Create New FAQ</h3>
        <input
          type="text"
          placeholder="Question"
          className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
          value={newFaq.question}
          onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
        />
        <textarea
          placeholder="Answer"
          className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
          value={newFaq.answer}
          onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
        />
        <button
          onClick={createFaq}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Create FAQ
        </button>
      </div>

      {/* FAQ List */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">FAQs</h3>
        {faqs.map((faq) => (
          <div key={faq._id} className="border-b border-gray-200 pb-4 mb-4">
            {editFaq && editFaq._id === faq._id ? (
              <div>
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
                  value={editFaq.question}
                  onChange={(e) => setEditFaq({ ...editFaq, question: e.target.value })}
                />
                <textarea
                  className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
                  value={editFaq.answer}
                  onChange={(e) => setEditFaq({ ...editFaq, answer: e.target.value })}
                />
                <button
                  onClick={updateFaq}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Update FAQ
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p className="font-semibold">{faq.question}</p>
                <p className="text-gray-700">{faq.answer}</p>
                <button
                  onClick={() => handleEditClick(faq)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg mt-2 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFaq(faq._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqManager;
