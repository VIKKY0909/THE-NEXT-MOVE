import React from 'react';


const Pcard = ({ product }) => {
  return (
      <div
          className="relative w-full max-w-xs mr-auto ml-0 my-4 flex flex-col bg-slate-50 items-center transition-transform duration-300 ease-in-out hover:scale-105">
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