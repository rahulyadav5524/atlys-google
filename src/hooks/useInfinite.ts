import { useRef, useEffect } from "react";

interface IUseInfiniteScrollProps {
  hasMoreItems: boolean;
  itemsCount: number;
  pageCount: number;
  fetchMoreItems: (page: number) => void;
}

export const useInfiniteScroll = (props: IUseInfiniteScrollProps) => {
  const lastFetchedPage = useRef<number>(-1);

  const handleScroll = () => {
    if (
      document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight + 500 &&
      props.hasMoreItems &&
      lastFetchedPage.current < props.pageCount
    ) {
      lastFetchedPage.current = props.pageCount;
      props.fetchMoreItems(props.pageCount + 1);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [props.hasMoreItems, props.itemsCount]);

  return {
    lastFetchedPage,
    handleScroll
  };
};
