import { CSSProperties, memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Skeleton as Sceletondeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleImageBlock } from '../../model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
    imgPersonalClass?: string;
    titlePersonalClass?: string;
    textPersonalClassA?: string;
    textPersonalClassB?: string;

    style?: CSSProperties;
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps) => {
        const {
            style,
            className,
            block,
            imgPersonalClass,
            titlePersonalClass,
            textPersonalClassA,
            textPersonalClassB,
        } = props;
        const { src, altTitle, title, text1, text2 } = block;

        const [isLoaded, setIsLoaded] = useState(false);

        return (
            <div
                className={classNames(cls.ArticleImageBlockComponent, {}, [
                    className,
                ])}
            >
                {block.title && (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={
                            <VStack
                                gap={'16'}
                                max
                                className={classNames(
                                    cls.ArticleImageBlockComponent,
                                    {},
                                    [className],
                                )}
                            >
                                {!isLoaded && (
                                    <Skeleton
                                        width="100%"
                                        height="auto"
                                        className={cls.skeleton}
                                    />
                                )}
                                <img
                                    src={src}
                                    alt={altTitle}
                                    className={classNames(
                                        `${cls.image} ${imgPersonalClass}`,
                                        { [cls.loaded]: isLoaded },
                                        [className],
                                    )}
                                    onLoad={() => setIsLoaded(true)}
                                    style={style}
                                />

                                {isLoaded && title && (
                                    <Text title={title} size="l" as="h2" />
                                )}
                                {isLoaded && text1 && <Text text={text1} />}
                                {isLoaded && text2 && <Text text={text2} />}
                            </VStack>
                        }
                        off={
                            <VStack
                                gap={'16'}
                                max
                                className={classNames(
                                    cls.ArticleImageBlockComponent,
                                    {},
                                    [className],
                                )}
                            >
                                {!isLoaded && (
                                    <Sceletondeprecated
                                        width="100%"
                                        height="auto"
                                        className={cls.skeleton}
                                    />
                                )}
                                <img
                                    src={src}
                                    alt={altTitle}
                                    className={classNames(
                                        `${cls.image} ${imgPersonalClass}`,
                                        { [cls.loaded]: isLoaded },
                                        [className],
                                    )}
                                    onLoad={() => setIsLoaded(true)}
                                    style={style}
                                />

                                {isLoaded && title && (
                                    <TextDeprecated
                                        title={title}
                                        titlePersonalClass={titlePersonalClass}
                                        size={TextSize.L}
                                        as="h2"
                                    />
                                )}
                                {isLoaded && text1 && (
                                    <TextDeprecated
                                        text={text1}
                                        textPersonalClass={textPersonalClassA}
                                    />
                                )}
                                {isLoaded && text2 && (
                                    <TextDeprecated
                                        text={text2}
                                        textPersonalClass={textPersonalClassB}
                                    />
                                )}
                            </VStack>
                        }
                    />
                )}
            </div>
        );
    },
);
