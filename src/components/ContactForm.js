import React, { useState, useEffect } from 'react';

function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const container = document.getElementById('container');
        const imageContainer = document.getElementById('imageContainer');

        container.classList.add('fade-in');
        imageContainer.classList.add('fade-in');
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
            isValid = false;
        }
        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
            isValid = false;
        }
        if (!formData.email) {
            newErrors.email = 'Email address is required';
            isValid = false;
        }
        if (!formData.message) {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            const container = document.getElementById('container');
            const thankYouMessage = document.getElementById('thankYouMessage');

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: 'access_key', //enter your access key
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        message: formData.message
                    })
                });

                const result = await response.json();

                if (result.success) {
                    container.style.transform = 'scale(0.1)';
                    container.style.opacity = '0';

                    setTimeout(() => {
                        container.style.display = 'none';
                        thankYouMessage.style.display = 'flex';
                    }, 2000);
                    setIsSubmitted(true);
                } else {
                    alert('Something went wrong. Please try again.');
                }
            } catch (error) {
                alert('Error submitting form. Please try again.');
            }
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-[#2c2c2c]'>
            <div className={`flex flex-col md:flex-row bg-[#2c2c2c] text-white shadow-lg rounded-lg p-6 ${isSubmitted ? 'hidden' : 'block'}`} id="container">
                <div className="w-full md:w-1/2 p-4">
                    <h1 className="text-2xl font-bold mb-4">Contact us</h1>
                    <p className="text-gray-300 mb-4">Subheading for description or instructions</p>
                    <form id="contactForm" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-300">First name</label>
                            <input
                                type="text"
                                id="first-name"
                                name="firstName"
                                className={`mt-1 p-2 block w-full shadow-sm border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 ${errors.firstName ? 'border-red-500' : ''}`}
                                placeholder="Jane"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-300">Last name</label>
                            <input
                                type="text"
                                id="last-name"
                                name="lastName"
                                className={`mt-1 p-2 block w-full shadow-sm border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 ${errors.lastName ? 'border-red-500' : ''}`}
                                placeholder="Smitherton"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`mt-1 p-2 block w-full shadow-sm border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 ${errors.email ? 'border-red-500' : ''}`}
                                placeholder="email@janesfakedomain.net"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300">Your message</label>
                            <textarea
                                id="message"
                                name="message"
                                className={`mt-1 p-2 block w-full shadow-sm border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 ${errors.message ? 'border-red-500' : ''}`}
                                placeholder="Enter your question or message"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 p-4 flex justify-center items-center" id="imageContainer">
                    <img src={`${process.env.PUBLIC_URL}/img.png`} 
                        srcSet={`${process.env.PUBLIC_URL}/img.png 2x, ${process.env.PUBLIC_URL}/img.png 3x`}  
                        alt="contact" className="rounded-md" />
                </div>
            </div>
            <div className={`thank-you-message ${isSubmitted ? 'flex' : 'hidden'} justify-center items-center bg-blue-500 text-white p-10 rounded-lg shadow-lg m-4`} id="thankYouMessage">
                <p className="text-xl font-semibold text-center">Thanks for contacting us! We will get back to you soon.</p>
            </div>
        </div>
    );
}

export default ContactForm;
