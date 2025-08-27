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

    gsap.set(imageContainerRef.current.querySelectorAll("img"), {
      y: "100%",
      position: "absolute",
      top: 0,
      left: 0,
    });

    // initial clip-path (rectangle)
    gsap.set(".loader", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    });

    tl.to(".loader", { opacity: 1, duration: 0.4 })
      .to(".imagediv", { scale: 4, duration: 1.2 }, "same")
      .to(".loader img.logo", { y: -140, duration: 1.2 }, "same")
      .to(".loader h3", { y: 140, duration: 1.2 }, "same")
      .to(
        obj,
        {
          val: 365,
          duration: 1.2,
          onUpdate: () => setCounter(Math.floor(obj.val)),
        },
        "same"
      )
      // images wipe-in
      .to(
        imageContainerRef.current.querySelectorAll("img"),
        {
          y: "0%",
          duration: 0.8,
          stagger: 0.25,
          ease: "expo.out",
        },
        ">=-0.2"
      )
      // loader slide + cloth bend
      .to(
        ".loader",
        {
          y: "75%",
          scale: 0.84,
          duration: 0.9,
          ease: "power3.inOut",
          clipPath: "polygon(0 0, 100% 0, 40% 100%, 60% 100%)", // bent sides
        },
        "slide"
      )
      // relax back to straight bottom (cloth release)
      .to(
        ".loader",
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          duration: 0.8,
          ease: "elastic.out(1, 0.4)",
        },
        "slide+=0.2"
      )
      // vanish
      .to(".loader", {
        opacity: 0,
        duration: 0.002,
      });
  }, [onComplete]);

  return (
    <div className="loader opacity-0 fixed inset-0 flex flex-col gap-12 items-center justify-center bg-[#F5F4F4] z-50">
      <img className="logo w-24" src="/images/logo.png" alt="logo" />

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

      <h3 className="text-xl font-[fanreg]">{counter}</h3>
    </div>
  );
};

export default Loader;
