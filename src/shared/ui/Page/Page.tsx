import { memo, MutableRefObject, ReactNode, useRef } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useInfiniteScrollWithScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import cls from "./Page.module.scss";

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLElement>;

  useInfiniteScrollWithScroll({
    wrapperRef,
    callback: onScrollEnd,
  });

  return (
    <section ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
      {children}
      {/* <div
        ref={triggerRef}
        className={cls.trigger}
      /> */}
    </section>
  );
});
