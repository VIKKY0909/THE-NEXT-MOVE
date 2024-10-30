import React, { useState, useEffect } from "react";
import './cat.css';

const Catalog = () => {
  const [products, setProducts] = useState([]); // State to hold products from backend
  const [content, setContent] = useState(""); 
  const [cost, setCost] = useState("");
  const [activeId, setActiveId] = useState(0);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBlurry, setIsBlurry] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: '0px', y: '0px' });
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 550);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products'); // Adjust API URL as needed
        const data = await response.json();
        setProducts(data); // Set fetched data to state
        if (data.length > 0) { 
          setContent(data[0].longDescription); 
          setCost(data[0].price);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 550);
    };

    window.addEventListener('resize', handleResize);

    if (isPopupActive && isSmallScreen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('no-scroll');
    };
  }, [isPopupActive, isSmallScreen]);

  const handleId = (id) => {
    setActiveId(id);
  };

  const handleClick = (e, description, price) => {
    if (isSmallScreen) {
      const rect = e.target.getBoundingClientRect();
      const x = `${rect.left + rect.width / 2}px`;
      const y = `${rect.top + rect.height / 2}px`;

      setStartPosition({ x, y });
      document.documentElement.style.setProperty('--start-x', x);
      document.documentElement.style.setProperty('--start-y', y);
    }

    setIsBlurry(true);
    setTimeout(() => {
      setContent(description);
      setCost(price);
      setIsBlurry(false);
    }, 500);

    setIsPopupActive(true);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const handleClose = () => {
    setIsPopupActive(false);
    if (isSmallScreen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }
  };

  return (
    <div className="mainbox" id="go">
      <div className={`overlay ${isPopupActive ? 'active' : ''}`} onClick={handleClose}></div>
      <div className="smallbox">
        {products.map((item, index) => (
          <a href="#go" key={item.id}>
            <div className="leftside" onClick={(e) => handleClick(e, item.longDescription, item.price)}>
              <div id="com" className={`imgbox ${index === activeId ? 'expanded' : 'blur-box'}`} onClick={() => handleId(index)}>
                <img src={item.image} alt={item.name} />
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className={`info ${isPopupActive ? 'active' : ''} ${isSmallScreen && isAnimating ? (isPopupActive ? 'zoom-in' : 'zoom-out') : ''} ${isBlurry ? 'blurry' : ''}`}>
        <div className="pname ">
          <p className="font-bold text-2xl">{products[activeId]?.name}</p>
          <button className="close" onClick={handleClose}>X</button>
        </div>

        <div className="orderbtn">
          <p>Price:{cost}</p>
          <button>Order</button>
        </div>
        <div className="data">{content}</div>
      </div>
    </div>
  );
};

export default Catalog;
