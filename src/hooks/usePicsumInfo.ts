import { useEffect, useState } from "react";

// Sample response from https://picsum.photos/id/0/info
// {
//     "id": "0",
//     "author": "Alejandro Escamilla",
//     "width": 5000,
//     "height": 3333,
//     "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
//     "download_url": "https://picsum.photos/id/0/5000/3333"
// }

export interface IImageInfo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

interface IUsePicsumInfo {
  imageId: string;
}

export const usePicsumInfo = (props: IUsePicsumInfo) => {
  const [data, setData] = useState<Record<string, IImageInfo>>();

  const fetchImageInfo = () => {
    fetch(`https://picsum.photos/id/${props.imageId}/info`).then(async res => {
      const body: IImageInfo = await res.json();

      setData(prev => ({
        ...prev,
        [props.imageId]: body
      }));
    });
  };

  useEffect(() => {
    if (data?.[props.imageId]) return;
    fetchImageInfo();
  }, [props.imageId]);

  return {
    data: data?.[props.imageId]
  };
};
