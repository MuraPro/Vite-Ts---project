import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/Text/Text";
import { ArticleTextBlock } from "../../model/types/article";
import cls from "./ArticleTextBlockComponent.module.scss";

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
  personalClassText?: string;
  personalClassTitle?: string;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block, personalClassText, personalClassTitle } = props;

    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title && (
          <Text
            title={block.title}
            className={cls.title}
            personalClassTitle={personalClassTitle}
          />
        )}
        {block.paragraphs.map((paragraph) => (
          <Text
            key={paragraph}
            text={paragraph}
            className={cls.paragraph}
            personalClassText={personalClassText}
          />
        ))}
      </div>
    );
  },
);
