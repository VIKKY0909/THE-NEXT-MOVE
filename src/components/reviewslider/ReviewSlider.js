import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ReviewCard from './ReviewCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import h1 from '../../assets/h1.png'; // Default avatar if image is not provided

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
         // Should log: https://your-backend-service.onrender.com
        const response = await fetch(`http://localhost:5000/api/reviews`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReviews(data); // Update state with fetched reviews
      } catch (err) {
        setError(err.message); // Set error message if there's an error
      } finally {
        setLoading(false); // Set loading to false once fetch is complete
      }
    };

    fetchReviews();
  }, []); // Empty dependency array to run once on mount

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  // Handle loading state
  if (loading) {
    return <div className="text-center text-white">Loading reviews...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="py-10">
      <header className="text-4xl text-white text-center font-light mb-10">
        <p>Our Client Reviews</p>
      </header>
      <div className="w-11/12 mx-auto">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              review={{
                text: review.text,
                name: review.reviewerName,
                rating: review.rating,
                avatar: review.image || h1 // Use default image if none provided
              }}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ReviewSlider;
