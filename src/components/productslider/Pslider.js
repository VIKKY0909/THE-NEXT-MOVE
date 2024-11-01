import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Pcard from './Pcard';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Pslider = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`); // Adjust URL as needed
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 }},
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, dots: true }},
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false }},
        ],
    };

    return (
        <div className='py-10'>
            <header className="text-4xl text-white text-center font-light mb-10">
                <p>Our Products</p>
            </header>
            <div className="w-11/12 mx-auto">
                <Slider {...settings}>
                    {products.map((product) => (
                        <Pcard 
                            key={product._id} 
                            product={{
                                image: product.image,
                                name: product.name,
                                price: product.price,
                                intro: product.shortDescription
                            }} 
                        />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Pslider;
