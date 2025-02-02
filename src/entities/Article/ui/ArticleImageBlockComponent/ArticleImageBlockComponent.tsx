// import { memo } from 'react';
// import { classNames } from '@/shared/lib/classNames/classNames';
// import { Text, TextSize } from '@/shared/ui/Text';
// import { ArticleImageBlock } from '../../model/types/article';
// import cls from './ArticleImageBlockComponent.module.scss';

// interface ArticleImageBlockComponentProps {
//     className?: string;
//     block: ArticleImageBlock;
//     imgPersonalClass?: string;
//     titlePersonalClass?: string;
//     textPersonalClassA?: string;
//     textPersonalClassB?: string;
// }

// export const ArticleImageBlockComponent = memo(
//     (props: ArticleImageBlockComponentProps) => {
//         const {
//             className,
//             block,
//             imgPersonalClass,
//             titlePersonalClass,
//             textPersonalClassA,
//             textPersonalClassB,
//         } = props;
//         const { src, altTitle, title, text1, text2 } = block;

//         return (
//             <div
//                 className={classNames(cls.ArticleImageBlockComponent, {}, [
//                     className,
//                 ])}
//             >
//                 <img
//                     src={src}
//                     alt={altTitle}
//                     className={`${cls.img} ${imgPersonalClass}`}
//                 />

//                 {title && (
//                     <Text
//                         text={title}
//                         titlePersonalClass={titlePersonalClass}
//                         size={TextSize.L}
//                     />
//                 )}
//                 {text1 && (
//                     <Text text={text1} textPersonalClass={textPersonalClassA} />
//                 )}
//                 {text2 && (
//                     <Text text={text2} textPersonalClass={textPersonalClassB} />
//                 )}
//             </div>
//         );
//     },
// );

import { CSSProperties, memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text';
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
            <VStack
                gap={'16'}
                max
                className={classNames(cls.ArticleImageBlockComponent, {}, [
                    className,
                ])}
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
                    <Text
                        title={title}
                        titlePersonalClass={titlePersonalClass}
                        size={TextSize.L}
                        as="h2"
                    />
                )}
                {isLoaded && text1 && (
                    <Text text={text1} textPersonalClass={textPersonalClassA} />
                )}
                {isLoaded && text2 && (
                    <Text text={text2} textPersonalClass={textPersonalClassB} />
                )}
            </VStack>
        );
    },
);
