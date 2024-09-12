const Carousal = () => {
  return (
    <div className="overflow-scroll">
      <div className="flex items-center mt-4 px-4 text-[#e8e8e8] w-full box-border">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="border border-[#414141] rounded-md overflow-hidden h-[48px] flex items-center min-w-fit mr-[8px]">
            <img
              src={`https://picsum.photos/100/100?random=${index}`}
              alt=""
              className="object-cover w-[48px] h-[48px]"
            />
            <span className="px-3 text-sm font-semibold">Amg</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousal;
