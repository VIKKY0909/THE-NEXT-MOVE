import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import ReviewBackground from '../../assets/ReviewBackground.png';

const ReviewCard = ({ review }) => {
  return (
    <motion.div
      className="relative w-full max-w-xs mx-auto my-4 p-6 overflow-hidden bg-cover bg-center"
      initial={{ opacity: 0, marginTop: 100 }}
      animate={{ opacity: 1, marginTop: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div
        className="absolute top-0 left-0 w-full h-[410px] bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ReviewBackground})` }}
      ></div>
      <img
        src={review.avatar}
        alt={review.name}
        className="relative top-28 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white z-40 mb-2"
      />
      <div className="relative w-full max-w-xs mx-auto bg-blue-50 h-52 p-5 mt-20 text-center shadow-lg">
        <h3 className="mt-4 text-lg font-bold mb-2">{review.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{review.position}</p>
        <blockquote className="text-gray-800 text-base leading-tight">{review.text}</blockquote>
        <div className="flex justify-center mt-4 space-x-1 text-yellow-400 relative z-20">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} className={index < review.rating ? 'text-yellow-500' : 'text-gray-300'} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
