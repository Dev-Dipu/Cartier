import HoverCard from "./HoverCard";

const Grid = () => {
  const data = [
    {
      image: "https://365ayearof.cartier.com/images/chapter-1/article-1/compressedImages/Article-Header-opt-300.WEBP",
      caption: "TRINITY, A SYMBOL OF UNITY",
      title: "Symbol of Unity",
      description:
        "The Trinity ring represents harmony and unity among different worlds.",
      flex: 1.5, // full height
      align: "start", // self-start
    },
    {
      image: "https://365ayearof.cartier.com/images/chapter-1/article-2/compressedImages/Article-Header-opt-300.WEBP",
      caption: "TRINITY 100, THE JOURNEY OF TRINITY",
      title: "Journey of Trinity",
      description:
        "A celebration of a century-long legacy of craftsmanship and meaning.",
      flex: 1, // smaller card
      align: "end", // self-end
    },
    {
      image: "https://365ayearof.cartier.com/images/chapter-1/article-3/compressedImages/Article-Header-opt-300.WEBP",
      caption: "CARTIER CELEBRATES 100 YEARS OF TRINITY",
      title: "All Linked by Trinity",
      description:
        "Five Cartier global ambassadors share their connections to Cartier’s iconic Trinity rings.",
      flex: 1, 
      align: "start",
    },
    {
      image: "https://365ayearof.cartier.com/images/chapter-1/article-5/compressedImages/Article-Header-opt-300.WEBP",
      caption: "TRINITY: A CONTEMPORARY ICON",
      title: "Contemporary Icon",
      description:
        "A timeless design reimagined for today’s world with elegance and creativity.",
      flex: 1.5,
      align: "end",
    },
  ];

  return (
    <div className="flex flex-wrap gap-6 p-8 mt-20 h-[600px]">
      {data.map((item, index) => (
        <div
          key={index}
          className={`
            flex-[${item.flex}] min-w-[250px] 
            ${item.flex === 1.5 ? "h-full" : "h-2/3"} 
            ${item.align === "start" ? "self-start" : "self-end"}
          `}
        >
          <HoverCard {...item} />
        </div>
      ))}
    </div>
  );
};

export default Grid;
