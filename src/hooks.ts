import { useEffect, useRef } from "react";

const useIntersectionObserver = (cb: () => void, options = {}) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cb();
        }
      },
      { rootMargin: "100px", ...options }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [cb, options]);

  return observerRef;
};

export { useIntersectionObserver };
