import React from 'react';
import Slider from 'react-slick';
import ReviewCard from './ReviewCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import h1 from '../../assets/h1.png';

const reviews = [
  {
    avatar: h1,
    name: 'Bang Upin',
    position: 'Pedagang Asongan',
    text: 'Terimakasih banyak, kini ruanganku menjadi lebih mewah dan terlihat mahal.',
    rating: 5,
  },
  {
    avatar: h1,
    name: 'Ibuk Sukijan',
    position: 'Ibu Rumah Tangga',
    text: 'Terimakasih banyak, kini ruanganku menjadi lebih mewah dan terlihat mahal.',
    rating: 4,
  },
  {
    avatar: h1,
    name: 'Mpok Ina',
    position: 'Karyawan Swasta',
    text: 'Sangat terjangkau untuk kantong saya yang tidak terlalu banyak.',
    rating: 4,
  },
];

const ReviewSlider = () => {
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
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="py-10">
      <header className="text-4xl text-white text-center font-light mb-10">
        <p>Our Client Reviews</p>
      </header>
      <div className="w-11/12 mx-auto">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ReviewSlider;
