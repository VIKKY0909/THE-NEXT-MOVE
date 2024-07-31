import React, { useEffect, useRef, useState } from 'react';
import Section from '../components/ordernow/Section';
import Contact from '../components/ordernow/Contact';

function OrderNow() {
  const [isVisible, setIsVisible] = useState(false);
  const initialContentRef = useRef(null);

  useEffect(() => {
    const currentInitialContent = initialContentRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('Initial content is visible');
          setIsVisible(true);
        } else {
          console.log('Initial content is not visible');
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (currentInitialContent) {
      observer.observe(currentInitialContent);
    }

    return () => {
      if (currentInitialContent) {
        observer.unobserve(currentInitialContent);
      }
    };
  }, []);

  return (
    <div className="sep">
      <div className="content-wrapper">
        <div className="section-2">
          <div className="Rectangle-1316">
            <section
              ref={initialContentRef}
              className={`content hidden ${isVisible ? 'fade-in' : ''}`}
            >
              <div className="text-content">
  <span className="block text-7xl font-bold pb-3" style={{ color: 'rgb(9, 56, 96)' }}>Switch R4</span>
  <span className="block text-2xl pb-2" style={{ color: 'rgb(9, 56, 96)' }}>Business To Retailer</span>
  <span className="block text-2xl pb-2" style={{ color: 'rgb(9, 56, 96)' }}>Business To Customer</span>
  <span className="block text-2xl pb-2" style={{ color: 'rgb(9, 56, 96)' }}>Business To Business</span>
</div>

              <div className="image-content">
                <img
                  src={`${process.env.PUBLIC_URL}/file.png`}
                  srcSet={`${process.env.PUBLIC_URL}/file.png 2x, ${process.env.PUBLIC_URL}/file.png 3x`}
                  className="file w-full" alt="Switch R4"
                />
              </div>
            </section>
          </div>
        </div>
        <Section 
          title="Business To Retailer"
          content="By stocking TNM products, retailers can attract tech-savvy customers looking for the latest in home automation solutions. We offer competitive pricing, reliable supply chains, and comprehensive marketing support to help retailers maximize their sales and enhance customer satisfaction. Join our network of trusted retailers and bring innovative smart home technology to your customers."
        />
        <Section
          title="Business To Customer"
          content="Transform your home with TNM's innovative smart home products. Designed with the end user in mind, our devices offer unparalleled convenience, energy savings, and enhanced security. Control your home from anywhere in the world, monitor energy consumption, and automate daily routines with ease. Whether you’re looking to create a comfortable ambiance, ensure home security, or reduce energy costs, TNM provides intuitive and reliable solutions that integrate seamlessly into your lifestyle. Experience the future of home automation with TNM."
        />
        <Section
          title="Business To Business"
          content="Enhance your business operations with TNM's innovative smart automation solutions. Our advanced technologies are designed to boost productivity, optimize resource management, and enhance security within your workplace. From intelligent energy management and automated lighting to sophisticated surveillance systems and access control, TNM offers tailored solutions that seamlessly integrate with your current infrastructure. Partner with TNM to equip your business with the tools necessary for a smarter, more efficient, and secure environment."
        />
        <Contact />
      </div>
    </div>
  );
}

export default OrderNow;
