import { memo, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleView } from '../../../../model/consts/articleConsts';
import cls from './ArticleListItemSkeletonRedisigned.module.scss';

interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeletonRedisigned = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { className, view } = props;
        const [windowSize, setWindowSize] = useState({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        useEffect(() => {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        if (view === ArticleView.BIG) {
            return (
                <div
                    className={classNames(cls.ArticleListItemRedesigned, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <Card className={cls.article__card}>
                        <div className={cls.header}>
                            <Skeleton border="50%" height={30} width={30} />
                            <Skeleton
                                width={150}
                                height={16}
                                className={cls.username}
                            />
                            <Skeleton
                                width={150}
                                height={16}
                                className={cls.date}
                            />
                        </div>
                        <Skeleton
                            width={250}
                            height={24}
                            className={cls.title}
                        />
                        <Skeleton height={300} className={cls.img} />
                        <div className={cls.footer}>
                            <Skeleton height={36} width={200} />
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <div
                className={classNames(cls.ArticleListItemRedesigned, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card className={cls.card} border="round">
                    {/* Скелетон для изображения */}

                    <div className={cls.imageWrapper}>
                        <Skeleton
                            width="100%"
                            height="100%"
                            className={cls.img}
                        />
                    </div>

                    {/* Основная информация */}
                    <VStack className={cls.info} gap="4" max>
                        {/* Заголовок */}
                        <Skeleton
                            width="200px"
                            height={24}
                            className={cls.title}
                        />

                        {/* Дата и просмотры */}
                        <HStack justify="between" max>
                            <Skeleton
                                width="30%"
                                height={16}
                                className={cls.date}
                            />
                        </HStack>

                        {/* Футер с пользователем */}
                        <VStack gap="4" className={cls.footer} max>
                            <HStack gap="4" max>
                                <Skeleton
                                    width="40px"
                                    height="40px"
                                    className={cls.avatar}
                                />
                                <Skeleton
                                    width="103px"
                                    height={16}
                                    className={cls.userName}
                                />
                                <Skeleton
                                    width="20%"
                                    height={16}
                                    className={cls.views}
                                />
                            </HStack>
                        </VStack>
                    </VStack>
                </Card>
            </div>
        );
    },
);
