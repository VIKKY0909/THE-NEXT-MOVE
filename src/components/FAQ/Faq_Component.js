import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Faq.css';
import { faqData } from "../../data/FaqData";

function Faq_Component() {
  const data = faqData;
  const [answerData, setAnswerData] = useState({
    question: data[0].question,
    answer: data[0].answer,
    activeIndex: 0
  });

  const intervalId = useRef(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderAnswer = useCallback((index) => {
    clearInterval(intervalId.current);
    setAnswerData({
      question: data[index].question,
      answer: data[index].answer,
      activeIndex: index
    });
  }, [data]);

  // useEffect(() => {
  //   if (answerData.activeIndex !== 0) {
  //     intervalId.current = setInterval(() => {
  //       setAnswerData(prev => {
  //         if (prev.activeIndex < data.length - 1) {
  //           return {
  //             question: data[prev.activeIndex + 1].question,
  //             answer: data[prev.activeIndex + 1].answer,
  //             activeIndex: prev.activeIndex + 1
  //           };
  //         } else {
  //           setSeconds(0);
  //           renderAnswer(0);
  //           clearInterval(intervalId.current);
  //           return prev;
  //         }
  //       });
  //     }, 2000);
  //   } else {
  //     clearInterval(intervalId.current);
  //   }

  //   return () => clearInterval(intervalId.current);
  // }, [answerData.activeIndex, data, renderAnswer]);

  return (
    <div className="faq-container">
      <h1 className="title">Frequently Asked Questions</h1>
      <div className="questions-answer">
        <div className='questions-box'>
          <div className="questions">
            {data.map((item, index) => (
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
            <h3 key={answerData.question} className="text-lg font-bold mb-4">{answerData.question}</h3>
            <p key={answerData.answer.answer1} className="mb-4">{answerData.answer.answer1}</p>
            <p key={answerData.answer.answer2}>{answerData.answer.answer2}</p>
        </div>
      </div>
    </div>
  );
}

export default Faq_Component;
