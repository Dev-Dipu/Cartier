
import React from "react";

const HoverCard = ({ image, caption, title, description }) => {
  return (
    <div className="group relative overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-20">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Caption (default visible, goes behind on hover) */}
      <div className=" w-full text-black py-2 font-[brillipro] text-[10px] transition-all duration-500 group-hover:translate-y-full group-hover:opacity-0 z-10">
        {caption}
      </div>

      {/* Overlay Content (appears on hover) */}
      <div className="absolute -translate-y-5 inset-0 flex flex-col items-center justify-center text-center bg-white scale-0 group-hover:scale-80 transition-transform duration-500 z-20">
        <h3 className="text-xl font-semibold font-[fanprolight] uppercase mb-10">{title}</h3>
        <p className="text-gray-600 px-6 font-[fanprolight] leading-none">{description}</p>
      </div>
    </div>
  );
};

const Grid = () => {
  const data = [
    {
      image: "https://365ayearof.cartier.com/images/chapter-1/article-1/compressedImages/Article-Header-opt-300.WEBP",
      caption: "TRINITY, A SYMBOL OF UNITY",
      title: "Symbol of Unity",
      description:
        "The Trinity ring represents harmony and unity among different worlds.",
    },
    {
      image: "https://365ayearof.cartier.com/images/chapter-1/article-2/compressedImages/Article-Header-opt-300.WEBP",
      caption: "TRINITY 100, THE JOURNEY OF TRINITY",
      title: "Journey of Trinity",
      description:
        "A celebration of a century-long legacy of craftsmanship and meaning.",
    },
    {
      image: "https://365ayearof.cartier.com/images/chapter-1/article-3/compressedImages/Article-Header-opt-300.WEBP",
      caption: "CARTIER CELEBRATES 100 YEARS OF TRINITY",
      title: "All Linked by Trinity",
      description:
        "Five Cartier global ambassadors share their connections to Cartier’s iconic Trinity rings.",
    },
    {
      image: "https://365ayearof.cartier.com/images/chapter-1/article-5/compressedImages/Article-Header-opt-300.WEBP",
      caption: "TRINITY: A CONTEMPORARY ICON",
      title: "Contemporary Icon",
      description:
        "A timeless design reimagined for today’s world with elegance and creativity.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 mt-20">
      {data.map((item, index) => (
        <HoverCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Grid;
