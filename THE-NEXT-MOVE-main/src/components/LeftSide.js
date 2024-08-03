import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SwitchR4Hubl = ({ image, experience, title, description, imageStyle }) => {
  const imageRef = useRef(null);
  const expRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 90%',
        toggleActions: 'restart restart none none',
      },
      defaults: { duration: 0.8, ease: 'power3.out' }
    });

    t2.fromTo(
      imageRef.current,
      { x: -200,y:0, opacity: 0 },
      { x: 0,y:0, opacity: 1 }
    )
    .fromTo(
      expRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.5"
    )
    .fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.4"
    )
    .fromTo(
      descRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.3"
    );
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col md:flex-row items-center rounded-lg mb-5 p-4 md:p-0">
        <div className="order-1 md:order-2 w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
          <img 
            src={image} 
            alt={title} 
            className="w-60 h-60 md:w-96 md:h-96 lg:ml-32 lg:w-full lg:h-full transform transition-transform duration-500" 
            style={imageStyle} 
            ref={imageRef} 
          />
        </div>
        <div className="order-2 md:order-1 text-center md:text-left text-white mb-4 md:w-5/12 md:ml-16 p-4 md:p-0">
          <div className="text-orange-400 tracking-wide text-lg md:text-xl mb-2 md:mt-20" ref={expRef}>{experience}</div>
          <h1 className="text-2xl md:text-4xl font-light mb-4" ref={titleRef}>{title}</h1>
          <p className="text-base md:text-lg" ref={descRef}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SwitchR4Hubl;
