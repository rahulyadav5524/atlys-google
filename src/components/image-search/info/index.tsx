import { type IImageInfo, usePicsumInfo } from "@/hooks/usePicsumInfo";
import { ArrowLeft, ArrowRight, XIcon } from "lucide-react";

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

export default ImageInfo;
