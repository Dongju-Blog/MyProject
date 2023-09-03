import React, {useRef} from 'react'

export default function useIntersectionObserver(callback: (entry: IntersectionObserverEntry) => any) {


  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry);
            
          }
        });
      },
      { threshold: 1 }
    )
  );

  const observe = (element: Element) => {
    observer.current.observe(element);
  };

  const unobserve = (element: Element) => {
    observer.current.unobserve(element);
  };



  return [observe, unobserve];
}