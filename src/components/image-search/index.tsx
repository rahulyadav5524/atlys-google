import { useEffect, useRef, useState } from "react";
import "./style.css";
import { usePicsum } from "@/hooks/usePicsum";
import { cn } from "@/lib/utils";
import ImageInfo from "./info";

const ImageSearch = () => {
  const [_, setRender] = useState<number>(0);
  const selectedIndex = useRef<number>(-1);

  const { data } = usePicsum();

  const handleOnImageClick = (index: number) => {
    selectedIndex.current = index;
    const el = document.getElementById(`image-${data[index].id}`);

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    setRender(prev => prev + 1);
  };

  const handleArrowClick = (dir: "left" | "right") => {
    if (dir === "left") {
      handleOnImageClick(selectedIndex.current === 0 ? selectedIndex.current : selectedIndex.current - 1);
    } else {
      handleOnImageClick(selectedIndex.current === data.length - 1 ? selectedIndex.current : selectedIndex.current + 1);
    }
  };

  const handleReset = () => {
    selectedIndex.current = -1;
    setRender(prev => prev + 1);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        handleReset();
        break;
      case "ArrowLeft":
        handleArrowClick("left");
        break;
      case "ArrowRight":
        handleArrowClick("right");
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [data]);

  return (
    <main className="mx-auto mt-4 px-4 flex gap-5 relative overflow-hidden">
      <div className="flex flex-wrap gap-5">
        {data.map((image, index) => (
          <div
            id={`image-${image.id}`}
            key={image.id}
            className={cn("aspect-square cursor-pointer bg-gray-200 rounded-lg overflow-hidden h-[156px] md:h-[204px] flex-grow", {
              "border border-blue-500": selectedIndex.current === index
            })}
            onClick={() => handleOnImageClick(index)}>
            <img
              src={image.download_url}
              alt="google search"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {selectedIndex.current > -1 && (
        <ImageInfo
          image={data[selectedIndex.current]}
          handleArrowClick={handleArrowClick}
          handleClose={handleReset}
        />
      )}
    </main>
  );
};

export default ImageSearch;
