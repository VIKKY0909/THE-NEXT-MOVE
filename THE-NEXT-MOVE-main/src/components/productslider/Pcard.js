import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Pcard = ({ product }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { scale: 1 },
      {
        scale: 1.05,
        duration: 0.3,
        ease: 'power3.out',
        paused: true,
        reversed: true,
        onHover: function () {
          this.reversed() ? this.play() : this.reverse();
        },
      }
    );

    cardRef.current.addEventListener('mouseenter', () => {
      gsap.to(cardRef.current, { scale: 1.05 });
    });

    cardRef.current.addEventListener('mouseleave', () => {
      gsap.to(cardRef.current, { scale: 1 });
    });
  }, []);

  return (
    <div
      className="relative w-[350px] h-[466px] mx-auto flex flex-col bg-slate-50 items-center bg-azure transition-transform duration-300 ease-in-out hover:scale-105"
      ref={cardRef}
    >
      <div className="w-full">
        <img src={product.image} alt={product.name} className="h-60 w-full object-cover" />
      </div>
      <div className="w-full text-center mt-2 px-4 space-y-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm font-light">{product.intro}</p>
        <h4 className="text-xl font-bold">
          <span>&#8377;</span>{product.price}
        </h4>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <a href="/order-now" className="text-[#6941C6] font-semibold">Buy Now</a>
        <a href="/product-catalog" className="text-[#C11574] font-semibold">Read More</a>
      </div>
    </div>
  );
};

export default Pcard;
