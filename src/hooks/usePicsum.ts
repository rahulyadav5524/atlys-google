import { useEffect, useRef, useState } from "react";
import { useInfiniteScroll } from "./useInfinite";
import type { IImageInfo } from "./usePicsumInfo";

// Sample response from https://picsum.photos/v2/list?page=1&limit=50
// [{
//   "id": "102",
//   "author": "Ben Moore",
//   "width": 4320,
//   "height": 3240,
//   "url": "https://unsplash.com/photos/pJILiyPdrXI",
//   "download_url": "https://picsum.photos/id/102/4320/3240"
// }]

const convertImageSize = (url: string, width: number, height: number) => {
  return `${url.split("/", 5).join("/")}/${width}/${height}`;
};

export const usePicsum = () => {
  const [data, setData] = useState<IImageInfo[]>([]);
  const lastFetchedPage = useRef<number>(0);

  const fetchMoreItems = (page: number) => {
    lastFetchedPage.current = page;
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=50`).then(async res => {
      const body: IImageInfo[] = await res.json();

      const modifiedData = body.map(item => ({ ...item, download_url: convertImageSize(item.download_url, 300, 300) }));

      setData([...data, ...modifiedData]);
    });
  };

  useInfiniteScroll({
    hasMoreItems: true,
    itemsCount: data.length,
    pageCount: lastFetchedPage.current,
    fetchMoreItems
  });

  useEffect(() => {
    fetchMoreItems(1);
  }, []);

  return {
    data
  };
};
