import { MicIcon, CameraIcon } from "lucide-react";
import { Input } from "../ui/input";

const InputSearch = () => {
  return (
    <div className="relative flex-grow">
      <Input
        type="text"
        placeholder="Search images"
        className="w-full pl-5 h-[44px] py-1 border-none rounded-full shadow-sm bg-[#303134] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <MicIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <CameraIcon className="absolute right-10 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default InputSearch;
