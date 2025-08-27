import React from 'react'

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

export default HoverCard