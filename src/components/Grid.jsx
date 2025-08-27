import HoverCard from "./HoverCard";

const Grid = ({data}) => {
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
