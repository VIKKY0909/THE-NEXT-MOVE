import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import h1 from '../../assets/h1.png';
import h2 from '../../assets/h2.png';
import h3 from '../../assets/h3.png';
import h4 from '../../assets/h4.png';
import h5 from '../../assets/h5.png';
import HLogo from '../../assets/HLogo.png';


gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroImagesRef = useRef([]);
  const leftDesRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroImagesRef.current,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top bottom",
        },
      }
    );

    gsap.fromTo(
      leftDesRef.current,
      { opacity: 0, x: -200 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top center",
        },
      }
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !heroImagesRef.current.includes(el)) {
      heroImagesRef.current.push(el);
    }
  };

  return (
    <div className="hero-section flex flex-col items-center justify-between w-full h-screen bg-gray-200 overflow-hidden p-4 md:flex-row md:p-0">
      <div className="right-intro relative flex justify-center items-center w-full h-1/2 md:h-full md:w-1/2 mt-8 md:mt-0">
        <img
          className="hero-image h1 absolute w-20 md:w-32 h-20 md:h-32"
          src={h1}
          alt="Hero 1"
          ref={addToRefs}
          style={{ top: '30%', left: '5%' }}
        />
        <img
          className="hero-image h2 absolute w-20 md:w-32 h-20 md:h-32"
          src={h2}
          alt="Hero 2"
          ref={addToRefs}
          style={{ top: '30%', right: '5%' }}
        />
        <img
          className="hero-image h3 absolute w-20 md:w-32 h-20 md:h-32"
          src={h3}
          alt="Hero 3"
          ref={addToRefs}
          style={{ bottom: '10%', right: '5%' }}
        />
        <img
          className="hero-image h4 absolute w-20 md:w-32 h-20 md:h-32"
          src={h4}
          alt="Hero 4"
          ref={addToRefs}
          style={{ bottom: '10%', left: '5%' }}
        />
        <img
          className="hero-image h5 absolute w-28 md:w-40 h-28 md:h-40"
          src={h5}
          alt="Hero 5"
          ref={addToRefs}
          style={{ top: '15%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
        <img
          className="hero-logo hl absolute w-28 md:w-48 h-24 md:h-48"
          src={HLogo}
          alt="Hero Logo"
          ref={addToRefs}
          style={{ top: '50%', left: '50%',transform: 'translate(-50%, -50%)' }}
        />
      </div>
      <div className="left-des mb-20 md:mt-40 ml-4 md:ml-16" ref={leftDesRef}>
        <h1 className="text-black font-semibold mb-10  text-lg md:text-2xl max-w-lg">
          Bringing innovation to your doorstep. Our switch r4 is more than just a
          device; it is a companion in convenience.
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
