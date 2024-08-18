import React from 'react';
import Slider from 'react-slick';
import Pcard from './Pcard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pcb from '../../assets/pcb.png';

const product = [
    {
        id: 1,
        name: "Product 1",
        price: 4500,
        image: pcb,
        intro: "Experience seamless assistance and support through our innovative customer-to-customer service platform. Connect with fellow smart home enthusiasts to share tips, troubleshoot issues, and discover new ways ",
    },
    {
        id: 2,
        name: "Product 2",
        price: 4500,
        image: pcb,
        intro: "Experience seamless assistance and support through our innovative customer-to-customer service platform. Connect with fellow smart home enthusiasts to share tips, troubleshoot issues, and discover new ways ",
    },
    {
        id: 3,
        name: "Product 3",
        price: 4500,
        image: pcb,
        intro: "Experience seamless assistance and support through our innovative customer-to-customer service platform. Connect with fellow smart home enthusiasts to share tips, troubleshoot issues, and discover new ways ",
    },
];

const Pslider = () => {
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
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
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

    return (
        <div className='py-10'>
            <header className="text-4xl text-white text-center font-light mb-10">
                <p>Our Products</p>
            </header>
            <div className="w-11/12 mx-auto">
                <Slider {...settings}>
                    {product.map((product, index) => (
                        <Pcard key={index} product={product} />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Pslider;
