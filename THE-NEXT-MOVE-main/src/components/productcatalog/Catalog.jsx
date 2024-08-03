import React, { useState, useEffect } from "react";
import './cat.css';
import cat1 from '../../assets/cat1.png';
import cat2 from '../../assets/cat2.png';
import cat3 from '../../assets/cat3.png';

const Catalog = () => {
  const shut = [
    {
      id: 1,
      name: "Image1",
      description: "Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)Transform your home with TNM's innovative smart home products... (truncated for brevity)",
      image:cat1,
      cost: "Price:₹59"
    },
    {
      id: 2,
      name: "Image2",
      description: "Transform your home with TNM's innovative smart home products...",
      image:cat2,
      cost: "Price:₹29"
    },
    {
      id: 3,
      name: "Image3",
      description: "Transform your home with TNM's innovative smart home products...",
      image: cat3,
      cost: "Price:₹29"
    },
  ];

  const [content, setContent] = useState(shut[0].description);
  const [cost, setCost] = useState(shut[0].cost);
  const [activeId, setActiveId] = useState(0);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBlurry, setIsBlurry] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: '0px', y: '0px' });
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 550);

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
      document.body.classList.remove('no-scroll'); // Clean up on unmount
    };
  }, [isPopupActive, isSmallScreen]);

  const handleId = (id) => {
    setActiveId(id);
  };

  const handleClick = (e, des, price) => {
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
      setContent(des);
      setCost(price);
      setIsBlurry(false);
    }, 500); // Duration of the blur effect

    setIsPopupActive(true);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 600); // Match the duration of the CSS animation
  };

  const handleClose = () => {
    setIsPopupActive(false);
    if (isSmallScreen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 600); // Match the duration of the CSS animation
    }
  };

  return (
    <div className="mainbox" id="go">
      <div className={`overlay ${isPopupActive ? 'active' : ''}`} onClick={handleClose}></div>
      <div className="smallbox">
        {shut.map((item, index) => (
          <a href="#go" key={index}>
            <div className="leftside" onClick={(e) => handleClick(e, item.description, item.cost)}>
              <div id="com" className={`imgbox ${index === activeId ? 'expanded' : 'blur-box'}`} onClick={() => handleId(index)}>
                <img src={item.image} alt="" />
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className={`info ${isPopupActive ? 'active' : ''} ${isSmallScreen && isAnimating ? (isPopupActive ? 'zoom-in' : 'zoom-out') : ''} ${isBlurry ? 'blurry' : ''}`}>
        <div className="pname">
          <h1>{shut[activeId].name}</h1>
          <button className="close" onClick={handleClose}>X</button>
        </div>

        <div className="orderbtn">
          <p>{cost}</p>
          <button>Order</button>
        </div>
        <div className="data">{content}</div>
      </div>
    </div>
  );
};

export default Catalog;
