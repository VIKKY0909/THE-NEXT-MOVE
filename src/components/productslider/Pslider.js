import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Pcard from './Pcard';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Pslider = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null);     // State for error handling

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
                setProducts(response.data);
                setLoading(false); // Set loading to false once products are fetched
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products."); // Set error message
                setLoading(false); // Stop loading even if there’s an error
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

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        <p className="ml-4 text-2xl">Loading Product...</p>
      </div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

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
