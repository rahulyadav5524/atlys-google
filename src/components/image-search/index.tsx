import { useEffect, useState } from "react";
import "./style.css";
import { usePicsum } from "@/hooks/usePicsum";
import { cn } from "@/lib/utils";
import ImageInfo from "./info";

const ImageSearch = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const { data } = usePicsum();

  const handleOnImageClick = (index: number) => {
    setSelectedIndex(index);
    const el = document.getElementById(`image-${data[index].id}`);

    if (el) {
      console.log(el);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleArrowClick = (dir: "left" | "right") => {
    if (dir === "left") {
      setSelectedIndex(prev => (prev === 0 ? prev : prev - 1));
    } else {
      setSelectedIndex(prev => (prev === data.length - 1 ? prev : prev + 1));
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        setSelectedIndex(-1);
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
  }, []);

  return (
    <main className="mx-auto mt-4 px-4 flex gap-5 relative overflow-hidden">
      <div className="flex flex-wrap gap-5">
        {data.map((image, index) => (
          <div
            id={`image-${image.id}`}
            key={image.id}
            className={cn("aspect-square cursor-pointer bg-gray-200 rounded-lg overflow-hidden h-[156px] md:h-[204px] flex-grow", {
              "border border-blue-500": selectedIndex === index
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
      {selectedIndex > -1 && (
        <ImageInfo
          image={data[selectedIndex]}
          handleArrowClick={handleArrowClick}
          handleClose={() => setSelectedIndex(-1)}
        />
      )}
    </main>
  );
};

export default ImageSearch;
