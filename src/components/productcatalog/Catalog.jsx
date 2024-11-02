import React, { useState, useEffect } from "react";
import './cat.css';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [content, setContent] = useState(""); 
  const [cost, setCost] = useState("");
  const [activeId, setActiveId] = useState(0);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBlurry, setIsBlurry] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 550);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);  // Start loading
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
        const data = await response.json();
        setProducts(data);
        if (data.length > 0) { 
          setContent(data[0].longDescription); 
          setCost(data[0].price);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);  // End loading
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 550);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isPopupActive, isSmallScreen]);

  const handleClick = (e, description, price) => {
    setIsBlurry(true);
    setTimeout(() => {
      setContent(description);
      setCost(price);
      setIsBlurry(false);
    }, 500);

    setIsPopupActive(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleClose = () => {
    setIsPopupActive(false);
    if (isSmallScreen) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <div className="mainbox" id="go">
      {isLoading ? (
        <div className="loading-spinner"> {/* Tailwind loading spinner */}
          <div className="animate-spin h-12 w-12 border-4 border-t-4 border-gray-200 rounded-full"></div>
        </div>
      ) : (
        <>
          <div className={`overlay ${isPopupActive ? 'active' : ''}`} onClick={handleClose}></div>
          <div className="smallbox">
            {products.map((item, index) => (
              <a href="#go" key={item.id}>
                <div className="leftside" onClick={(e) => handleClick(e, item.longDescription, item.price)}>
                  <div id="com" className={`imgbox ${index === activeId ? 'expanded' : 'blur-box'}`} onClick={() => setActiveId(index)}>
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className={`info ${isPopupActive ? 'active' : ''} ${isSmallScreen && isAnimating ? (isPopupActive ? 'zoom-in' : 'zoom-out') : ''} ${isBlurry ? 'blurry' : ''}`}>
            <div className="pname">
              <p className="font-bold text-2xl">{products[activeId]?.name}</p>
              <button className="close" onClick={handleClose}>X</button>
            </div>

            <div className="orderbtn">
              <p>Price: {cost}</p>
              <button>Order</button>
            </div>
            <div className="data">{content}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Catalog;
