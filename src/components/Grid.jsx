
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
      <div className=" w-full text-black px-4 py-3 font-semibold text-sm transition-all duration-500 group-hover:translate-y-full group-hover:opacity-0 z-10">
        {caption}
      </div>

      {/* Overlay Content (appears on hover) */}
      <div className="absolute -translate-y-5 inset-0 flex flex-col items-center justify-center text-center bg-white/95 scale-0 group-hover:scale-80 transition-transform duration-500 z-20">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 px-6">{description}</p>
      </div>
    </div>
  );
};

const Grid = () => {
  const data = [
    {
      image: "https://picsum.photos/400/300?random=1",
      caption: "TRINITY, A SYMBOL OF UNITY",
      title: "Symbol of Unity",
      description:
        "The Trinity ring represents harmony and unity among different worlds.",
    },
    {
      image: "https://picsum.photos/400/300?random=2",
      caption: "TRINITY 100, THE JOURNEY OF TRINITY",
      title: "Journey of Trinity",
      description:
        "A celebration of a century-long legacy of craftsmanship and meaning.",
    },
    {
      image: "https://picsum.photos/400/300?random=3",
      caption: "CARTIER CELEBRATES 100 YEARS OF TRINITY",
      title: "All Linked by Trinity",
      description:
        "Five Cartier global ambassadors share their connections to Cartier’s iconic Trinity rings.",
    },
    {
      image: "https://picsum.photos/400/300?random=4",
      caption: "TRINITY: A CONTEMPORARY ICON",
      title: "Contemporary Icon",
      description:
        "A timeless design reimagined for today’s world with elegance and creativity.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 mt-26">
      {data.map((item, index) => (
        <HoverCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Grid;
