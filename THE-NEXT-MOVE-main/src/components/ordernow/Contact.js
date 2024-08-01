import React, { useEffect, useRef, useState } from 'react';
import './order.css';

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    quantity: '',
    orderType: 'b2b',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const contactRef = useRef(null);

  useEffect(() => {
    const currentContact = contactRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (currentContact) {
      observer.observe(currentContact);
    }

    return () => {
      if (currentContact) {
        observer.unobserve(currentContact);
      }
    };
  }, []);

  useEffect(() => {
    const { firstName, lastName, email, phone, quantity, orderType } = formData;
    const isFormValid = firstName && lastName && email && phone && quantity && orderType;
    console.log('Form validation:', isFormValid); // Debugging
    setIsFormValid(isFormValid);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input change:', name, value); // Debugging
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submit attempt:', formData, 'isFormValid:', isFormValid);
  
    if (isFormValid) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_key: 'YOUR_ACCESS_KEY',
            ...formData,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log('Form submitted successfully:', result);
  
        if (result.success) {
          setErrorMessage('');
          // You can add any success handling logic here, e.g., clearing the form or showing a success message.
        } else {
          setErrorMessage('There was an error submitting the form. Please try again.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setErrorMessage('There was an error submitting the form. Please try again.');
      }
    } else {
      setErrorMessage('Please fill out all fields.');
    }
  };
  
  return (
    <div className="sep py-20">
      <section
        ref={contactRef}
        className={`opacity-0 transition-opacity duration-1000 ease-in-out ${isVisible ? 'fade-in' : ''}`}
      >
        <div className="w-full h-full p-0 m-0 overflow-x-hidden bg-gray-900 font-sans">
          <h1 className="pt-8 text-6xl text-center text-white mb-6">Contact us</h1>
          <div className="flex flex-col items-center justify-center px-4 md:flex-row">
            <div className="p-8 bg-gray-700 rounded-xl md:w-1/3 md:mr-4 mb-4 md:mb-0">
              <h2 className={`text-white mb-32 text-2xl ${isVisible ? 'fade-in' : 'opacity-0'}`}>Contact Information</h2>
              <ul className="list-none mb-12">
                <li className={`text-white mb-12 text-lg flex items-center ${isVisible ? 'fade-in' : 'opacity-0'}`}><i className="fas fa-phone mr-2"></i> +1012 3456 789</li>
                <li className={`text-white mb-12 text-lg flex items-center ${isVisible ? 'fade-in' : 'opacity-0'}`}><i className="fas fa-envelope mr-2"></i> demo@gmail.com</li>
                <li className={`text-white mb-12 text-lg flex items-center ${isVisible ? 'fade-in' : 'opacity-0'}`}><i className="fas fa-map-marker-alt mr-2"></i> 132 Dartmouth Street Boston, Massachusetts 02156 United States</li>
              </ul>
            </div>
            <div className="p-8 bg-white rounded-xl w-full md:w-2/3">
              <h2 className={`mb-4 text-2xl ${isVisible ? 'fade-in' : 'opacity-0'}`} style={{ color: 'rgb(9, 56, 96)' }}>Contact Details</h2>
              {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY" />
                <div className="flex flex-wrap mb-4">
                  <div className="w-full md:w-1/2 pr-2 mb-2">
                    <label htmlFor="first-name" className={`mb-2 text-gray-700 ${isVisible ? 'fade-in' : 'opacity-0'}`}>First Name</label>
                    <input
                      type="text"
                      id="first-name"
                      name="firstName"
                      className={`w-full border-b border-gray-300 focus:outline-none focus:border-black transition-all duration-300 ease-in-out ${isVisible ? 'fade-in' : 'opacity-0'}`}
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 pl-2 mb-2">
                    <label htmlFor="last-name" className={`mb-2 text-gray-700 ${isVisible ? 'fade-in' : 'opacity-0'}`}>Last Name</label>
                    <input
                      type="text"
                      id="last-name"
                      name="lastName"
                      className={`w-full border-b border-gray-300 focus:outline-none focus:border-black transition-all duration-300 ease-in-out ${isVisible ? 'fade-in' : 'opacity-0'}`}
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-4">
                  <div className="w-full md:w-1/2 pr-2 mb-2">
                    <label htmlFor="email" className={`mb-2 text-gray-700 ${isVisible ? 'fade-in' : 'opacity-0'}`}>Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full border-b border-gray-300 focus:outline-none focus:border-black transition-all duration-300 ease-in-out ${isVisible ? 'fade-in' : 'opacity-0'}`}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 pl-2 mb-2">
                    <label htmlFor="phone" className={`mb-2 text-gray-700 ${isVisible ? 'fade-in' : 'opacity-0'}`}>Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`w-full border-b border-gray-300 focus:outline-none focus:border-black transition-all duration-300 ease-in-out ${isVisible ? 'fade-in' : 'opacity-0'}`}
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="quantity" className={`mb-2 text-gray-700 ${isVisible ? 'fade-in' : 'opacity-0'}`}>Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className={`w-full border-b border-gray-300 focus:outline-none focus:border-black transition-all duration-300 ease-in-out ${isVisible ? 'fade-in' : 'opacity-0'}`}
                    value={formData.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className={`mb-2 text-gray-700 ${isVisible ? 'fade-in' : 'opacity-0'}`}>Type Of Order</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2 gap-x-4">
                    <div className="mb-2 sm:mb-0">
                      <input
                        type="radio"
                        id="b2b"
                        name="orderType"
                        value="b2b"
                        className="mr-2"
                        checked={formData.orderType === 'b2b'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="b2b" className={`mr-4 text-gray-700 ${isVisible ? 'fade-in' : 'opacity-0'}`}>Business to Business</label>
                    </div>
                    <div className="mb-2 sm:mb-0">
                      <input
                        type="radio"
                        id="b2r"
                        name="orderType"
                        value="b2r"
                        className="mr-2"
                        checked={formData.orderType === 'b2r'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="b2r" className={`mr-4 text-gray-700 ${isVisible ? 'fade-in' : 'opacity-0'}`}>Business to Retailer</label>
                    </div>
                    <div className="mb-2 sm:mb-0">
                      <input
                        type="radio"
                        id="c2b"
                        name="orderType"
                        value="c2b"
                        className="mr-2"
                        checked={formData.orderType === 'c2b'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="c2b" className={`mr-4 text-gray-700 ${isVisible ? 'fade-in' : 'opacity-0'}`}>Customer to Business</label>
                    </div>
                  </div>
                </div>
                <p className={`mt-4 text-sm text-gray-700 ${isVisible ? 'fade-in' : 'opacity-0'}`}>*TNM will contact you for confirming the order</p>
                <button
                  type="submit"
                  className={`block ml-auto mt-12 py-1.5 px-4 bg-gray-800 text-white rounded ${isVisible ? 'fade-in' : 'opacity-0'}`}
                  disabled={!isFormValid}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
