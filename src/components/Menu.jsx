import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Menu = ({ open }) => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (open) {
      // Open animation
      gsap.fromTo(
        leftRef.current,
        { y: "100%", skewX: -15, transformOrigin: "bottom right" },
        { y: "0%", skewX: 0, duration: 1.2, ease: "power4.inOut" }
      );

      gsap.fromTo(
        rightRef.current,
        { y: "100%", skewX: 15, transformOrigin: "bottom left" },
        { y: "0%", skewX: 0, duration: 1.2, ease: "power4.inOut" }
      );
    } else {
      // Close animation
      gsap.to(leftRef.current, {
        y: "100%",
        skewX: -15,
        transformOrigin: "bottom right",
        duration: 1,
        ease: "power4.inOut",
      });

      gsap.to(rightRef.current, {
        y: "100%",
        skewX: 15,
        transformOrigin: "bottom left",
        duration: 1,
        ease: "power4.inOut",
      });
    }
  }, [open]);

  return (
    <div className="absolute scale-95 z-50 h-screen w-full text-white overflow-hidden pointer-events-none">
      {/* Left Half */}
      <div
        ref={leftRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-red-500 origin-bottom-right"
      >
        <div className="flex justify-center items-center h-full text-3xl">
          Left Page
        </div>
      </div>

      {/* Right Half */}
      <div
        ref={rightRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-blue-500 origin-bottom-left"
      >
        <div className="flex justify-center items-center h-full text-3xl">
          Right Page
        </div>
      </div>
    </div>
  );
};

export default Menu;
