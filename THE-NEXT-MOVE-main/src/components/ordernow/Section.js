import React, { useEffect, useRef, useState } from 'react';

function Section({ title, content, isLastSection }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full py-4">
      <div className="w-full px-2 md:px-4 lg:px-8 xl:px-12">
        <h1
          className={`pt-4 text-4xl md:text-5xl lg:text-6xl text-center text-white mb-4 opacity-0 transition-opacity duration-1000 ease-in-out ${isVisible ? 'fade-in' : ''}`}
        >
          {title}
        </h1>
        <div className={`w-full h-auto p-0 m-0 overflow-hidden bg-white font-sans py-8 px-6 rounded-lg shadow-lg ${isLastSection ? 'pb-4' : ''}`}>
          <div className="flex flex-col items-center justify-center px-4 md:px-8">
            <section
              ref={sectionRef}
              className={`opacity-0 transition-opacity duration-1000 ease-in-out ${isVisible ? 'fade-in' : ''}`}
            >
              <p className={`text-base md:text-lg ${isVisible ? 'fade-in' : 'opacity-0'}`} style={{ color: 'rgb(9, 56, 96)' }}>{content}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;
