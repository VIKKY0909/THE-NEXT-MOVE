import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Faq.css';

function Faq_Component() {
  const [faqs, setFaqs] = useState([]); // State to store fetched FAQs
  const [answerData, setAnswerData] = useState({
    question: '',
    answer: '',
    activeIndex: 0
  });

  const intervalId = useRef(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/faqs`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFaqs(data); // Set fetched data to state

        // Set initial answer data if data is available
        if (data.length > 0) {
          setAnswerData({
            question: data[0].question,
            answer: data[0].answer,
            activeIndex: 0
          });
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFaqs();
  }, []); // Run once on mount

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderAnswer = useCallback((index) => {
    clearInterval(intervalId.current);
    setAnswerData({
      question: faqs[index].question,
      answer: faqs[index].answer,
      activeIndex: index
    });
  }, [faqs]);

  return (
    <div className="faq-container">
      <h1 className="title">Frequently Asked Questions</h1>
      <div className="questions-answer">
        <div className='questions-box'>
          <div className="questions">
            {faqs.map((item, index) => (
              <div
                key={index}
                className={index === answerData.activeIndex ? 'question active' : 'question'}
                onClick={() => renderAnswer(index)}
              >
                <div className='circle-box'>
                  <div className='circle'></div>
                </div>
                <div className='question-box'>
                  {item?.question}
                </div>
                <div className='right-arrow-box'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 4L16 12L8 20" stroke="#5D5FEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="answer-box w-1/2 h-[90vh] bg-blue-50 p-10 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">{answerData.question}</h3>
            <p>{answerData.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default Faq_Component;
