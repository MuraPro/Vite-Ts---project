import { MutableRefObject, useEffect } from "react";

export interface UseInfiniteScrollOptions {
  callback?: () => void;
  wrapperRef?: MutableRefObject<HTMLElement | null>;
}

export function useInfiniteScrollWithScroll({
  callback,
  wrapperRef,
}: UseInfiniteScrollOptions) {
  //   useEffect(() => {
  //     const wrapperElement = wrapperRef?.current || window;

  //     const handleScroll = () => {
  //       let scrollTop: number;
  //       let scrollHeight: number;
  //       let clientHeight: number;

  //       if (wrapperElement instanceof HTMLElement) {
  //         scrollTop = wrapperElement.scrollTop;
  //         scrollHeight = wrapperElement.scrollHeight;
  //         clientHeight = wrapperElement.clientHeight;
  //       } else {
  //         scrollTop = window.scrollY;
  //         scrollHeight = document.documentElement.scrollHeight;
  //         clientHeight = window.innerHeight;
  //       }

  //       if (scrollTop + clientHeight >= scrollHeight - 10) {
  //         console.log("Triggering callback");
  //         callback?.();
  //       }
  //     };

  //     // Принудительное срабатывание обработчика после добавления
  //     handleScroll();

  //     wrapperElement.addEventListener("scroll", handleScroll);

  //     return () => {
  //       wrapperElement.removeEventListener("scroll", handleScroll);
  //     };
  //   }, [callback, wrapperRef]);

  useEffect(() => {
    const wrapperElement = wrapperRef?.current || window;

    const handleScroll = () => {
      let scrollTop: number;
      let scrollHeight: number;
      let clientHeight: number;

      if (wrapperElement instanceof HTMLElement) {
        scrollTop = wrapperElement.scrollTop;
        scrollHeight = wrapperElement.scrollHeight;
        clientHeight = wrapperElement.clientHeight;
      } else {
        scrollTop = window.scrollY;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight;
      }

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        console.log("Triggering callback");
        callback?.();
      }
    };

    const handleResizeOrScroll = () => {
      handleScroll();
    };

    wrapperElement.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResizeOrScroll);

    return () => {
      wrapperElement.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResizeOrScroll);
    };
  }, [callback, wrapperRef]);
}
