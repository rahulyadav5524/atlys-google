import { useEffect, useState } from "react";
import "./style.css";
import { ArrowLeft, ArrowRight, XIcon } from "lucide-react";
import { usePicsum } from "@/hooks/usePicsum";
import { usePicsumInfo, type IImageInfo } from "@/hooks/usePicsumInfo";
import { cn } from "@/lib/utils";

interface IImageInfoProps {
  image: IImageInfo;
  handleArrowClick: (dir: "left" | "right") => void;
  handleClose: () => void;
}

const ImageInfo = (props: IImageInfoProps) => {
  const { data } = usePicsumInfo({ imageId: props.image.id });

  return (
    <div className="image-info-popover text-white">
      <div className="min-h-[44px] flex items-center px-4 justify-between">
        <span>{data?.author}</span>
        <div className="flex gap-4 items-center">
          <ArrowLeft
            size={20}
            className="cursor-pointer"
            onClick={() => props.handleArrowClick("left")}
          />
          <ArrowRight
            size={20}
            className="cursor-pointer"
            onClick={() => props.handleArrowClick("right")}
          />
          <XIcon
            size={20}
            className="cursor-pointer"
            onClick={props.handleClose}
          />
        </div>
      </div>
      <div className="bg-black flex-1 flex items-center justify-center overflow-hidden">
        <img
          src={props.image.download_url}
          alt="google search"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

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
