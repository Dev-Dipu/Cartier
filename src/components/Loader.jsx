import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const imageContainerRef = useRef(null);

  const images = [
    "https://365ayearof.cartier.com/images/chapter-1/article-1/compressedImages/Article-Header-opt-600.WEBP",
    "https://365ayearof.cartier.com/images/chapter-4/article-1/compressedImages/Article-Header-opt-1920.WEBP",
    "https://365ayearof.cartier.com/images/chapter-5/article-3/compressedImages/Article-Header-opt-1920.WEBP",
    "https://365ayearof.cartier.com/images/chapter-1/article-4/compressedImages/Article-Header-opt-600.WEBP",
    "https://365ayearof.cartier.com/images/chapter-1/article-3/compressedImages/Article-Header-opt-1920.WEBP",
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    let obj = { val: 0 };
    const imgs = imageContainerRef.current.querySelectorAll("img");

    // Initial state → masked (height = 0 via clip-path)
    gsap.set(imgs, {
      clipPath: "inset(100% 0% 0% 0%)",
      position: "absolute",
      top: 0,
      left: 0,
    });

    // Initial loader state
    gsap.set(".loader", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    });

    tl.to(".loader", { opacity: 1, duration: 0.4 })
    .to(".loader img.logo", { y: -140, duration: 1.2, ease: "power3.inOut" }, "same")
    .to(".loader h3", { y: 140, duration: 1.2, ease: "power3.inOut" }, "same")
    .to(".imagediv", { scale: 4, delay: 0.4, duration: 1.2 }, "same")
      .to(
        obj,
        {
          val: 365,
          duration: 1.2,
          ease: "power3.out",
          onUpdate: () => setCounter(Math.floor(obj.val)),
        },
        "same"
      )
      // buttery reveal images (mask opens down→up)
      .to(
        imgs,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          stagger: 0.4,
          ease: "power4.out",
        },
        ">=-0.2"
      )
      // Enhanced loader cloth bend - just a bit more dramatic
      .to(
        ".loader",
        {
          y: "75%", // Slight increase from 75%
          scale: 0.65, // Slight decrease from 0.7
          duration: 1.8, // Keep it smooth
          ease: "power3.inOut", // Keep original easing
          clipPath: "polygon(0 0, 100% 0, 20% 100%, 80% 100%)",
        },
        "slide"
      )
      // Enhanced relax back (cloth release)
      .to(
        ".loader",
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          duration: 1.0, // Slightly longer
          ease: "elastic.out(4, 1.8)", // Just a bit more bounce
        },
        "slide+=0.25"
      )
      // vanish
      .to(".loader", {
        opacity: 0,
        duration: 0.002,
      });
  }, [onComplete]);

  return (
    <div className="loader opacity-0 fixed inset-0 flex flex-col gap-12 items-center justify-center bg-white z-50">
      {/* Logo */}
      <img className="logo w-24" src="/images/logo.png" alt="logo" />

      {/* Images container */}
      <div
        ref={imageContainerRef}
        className="imagediv relative h-22 aspect-[3/4] bg-[#c09c54] overflow-hidden"
      >
        {images.map((src, index) => (
          <img
            key={index}
            className="w-full h-full object-cover"
            src={src}
            alt={`slide-${index}`}
          />
        ))}
      </div>

      {/* Counter */}
      <h3 className="text-xl font-[fanreg]">{counter}</h3>
    </div>
  );
};

export default Loader;