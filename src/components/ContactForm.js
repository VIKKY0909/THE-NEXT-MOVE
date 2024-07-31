import React, { useEffect } from 'react';
import './contact.css';

function ContactForm() {
    useEffect(() => {
        const container = document.getElementById('container');
        const imageContainer = document.getElementById('imageContainer');

        container.classList.add('fade-in');
        imageContainer.classList.add('fade-in');
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault(); 

        const container = document.getElementById('container');
        const thankYouMessage = document.getElementById('thankYouMessage');

       
        container.style.transform = 'scale(0.1)';
        container.style.opacity = '0';

        
        setTimeout(() => {
            container.style.display = 'none';
            thankYouMessage.style.display = 'block';
        }, 2000); 
    };

    return (
        <div className='div'>
        <div className="app">
            <div className="container" id="container">
                <div className="contact-form">
                    <h1>Contact us</h1>
                    <p>Subheading for description or instructions</p>
                    <form id="contactForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="first-name">First name</label>
                            <input type="text" id="first-name" name="first-name" placeholder="Jane" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last-name">Last name</label>
                            <input type="text" id="last-name" name="last-name" placeholder="Smitherton" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" id="email" name="email" placeholder="email@janesfakedomain.net" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Your message</label>
                            <textarea id="message" name="message" placeholder="Enter your question or message"></textarea>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="image-container" id="imageContainer">
                    <img src={`${process.env.PUBLIC_URL}/img.png`} 
                    srcSet={`${process.env.PUBLIC_URL}/img.png 2x, ${process.env.PUBLIC_URL}/img.png 3x`}  
                    alt="contact" />
                </div>
            </div>
            <div className="thank-you-message" id="thankYouMessage">
                <p>Thanks for contacting us! We will get back to you soon.</p>
            </div>
        </div>
        </div>

    );
}

export default ContactForm;
