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
    <div className="sep ml-44">
      <h1
        className={`pt-8 text-6xl text-center text-white mb-6 opacity-0 transition-opacity duration-1000 ease-in-out ${isVisible ? 'fade-in' : ''}`}
      >
        {title}
      </h1>
      <div className={`w-11/12 h-5/6 p-0 m-0 overflow-x-hidden overflow-y-clip bg-white font-sans py-10 rounded-lg shadow-white shadow-md ${isLastSection ? 'pb-10' : ''}`}>
        <div className="flex flex-col items-center justify-center px-10">
          <section
            ref={sectionRef}
            className={`opacity-0 transition-opacity duration-1000 ease-in-out ${isVisible ? 'fade-in' : ''}`}
          >
            <p className={`text-lg ${isVisible ? 'fade-in' : 'opacity-0'}`} style={{ color: 'rgb(9, 56, 96)'}}>{content}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Section;
