import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text, TextSize } from "@/shared/ui/Text";
import { ArticleImageBlock } from "../../model/types/article";
import cls from "./ArticleImageBlockComponent.module.scss";

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  (props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
      >
        {block?.src ? (
          <img src={block.src} alt={block.title} className={cls.img} />
        ) : null}

        {block.title && (
          <Text
            text={block.title}
            personalClassText={cls.articleimage__title}
            size={TextSize.L}
          />
        )}
        {block.text1 && (
          <Text text={block.text1} personalClassText={cls.articleimage__text} />
        )}
        {block.text2 && (
          <Text text={block.text2} personalClassText={cls.articleimage__text} />
        )}
      </div>
    );
  },
);
