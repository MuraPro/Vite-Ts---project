import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
    Button as ButtonDeprecated,
    ButtonSize,
} from '@/shared/ui/deprecated/Button';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Modal as ModalDeprecated } from '@/shared/ui/deprecated/Modal';
import { StarRating as StarRatingDeprecated } from '@/shared/ui/deprecated/StarRating';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './Rating.module.scss';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const Rating = memo((props: RatingCardProps) => {
    const {
        className,
        onAccept,
        feedbackTitle,
        hasFeedback,
        onCancel,
        title,
        rate = 0,
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <>
                    <Text title={feedbackTitle} variant={'primary'} />
                    <Input
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                        className={cls.ratin__input}
                    />
                </>
            }
            off={
                <>
                    <TextDeprecated
                        title={feedbackTitle}
                        theme={TextTheme.PRIMARY}
                    />
                    <InputDeprecated
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                        className={cls.ratin__input}
                    />
                </>
            }
        />
    );

    const drawerContent = (
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
            <VStack gap="32">
                {modalContent}
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Button
                            fullWidth
                            onClick={acceptHandle}
                            size="l"
                            className={cls.rating__button}
                        >
                            {t('Отправить')}
                        </Button>
                    }
                    off={
                        <ButtonDeprecated
                            fullWidth
                            onClick={acceptHandle}
                            size={ButtonSize.L}
                            className={cls.rating__button}
                        >
                            {t('Отправить')}
                        </ButtonDeprecated>
                    }
                />
            </VStack>
        </Drawer>
    );

    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <>
                    <VStack align="center" gap="8">
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <Text
                                    title={
                                        starsCount
                                            ? t('Спасибо за оценку!')
                                            : title
                                    }
                                />
                            }
                            off={
                                <TextDeprecated
                                    title={
                                        starsCount
                                            ? t('Спасибо за оценку!')
                                            : title
                                    }
                                />
                            }
                        />
                        <StarRating
                            selectedStars={starsCount}
                            size={40}
                            onSelect={onSelectStars}
                        />
                    </VStack>

                    {isMobile ? (
                        drawerContent
                    ) : (
                        <Modal isOpen={isModalOpen} lazy>
                            <div className={cls.rating__modal}>
                                <VStack max gap="32">
                                    {modalContent}
                                    <HStack max gap="16" justify="end">
                                        <ToggleFeatures
                                            feature="isAppRedesigned"
                                            on={
                                                <>
                                                    <Button
                                                        onClick={cancelHandle}
                                                        className={
                                                            cls.rating__button
                                                        }
                                                    >
                                                        {t('Закрыть')}
                                                    </Button>
                                                    <Button
                                                        onClick={acceptHandle}
                                                        className={
                                                            cls.rating__button
                                                        }
                                                    >
                                                        {t('Отправить')}
                                                    </Button>
                                                </>
                                            }
                                            off={
                                                <>
                                                    <ButtonDeprecated
                                                        onClick={cancelHandle}
                                                        className={
                                                            cls.rating__button
                                                        }
                                                    >
                                                        {t('Закрыть')}
                                                    </ButtonDeprecated>
                                                    <ButtonDeprecated
                                                        onClick={acceptHandle}
                                                        className={
                                                            cls.rating__button
                                                        }
                                                    >
                                                        {t('Отправить')}
                                                    </ButtonDeprecated>
                                                </>
                                            }
                                        />
                                    </HStack>
                                </VStack>
                            </div>
                        </Modal>
                    )}
                </>
            }
            off={
                <>
                    <VStack align="center" gap="8">
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <Text
                                    title={
                                        starsCount
                                            ? t('Спасибо за оценку!')
                                            : title
                                    }
                                />
                            }
                            off={
                                <TextDeprecated
                                    title={
                                        starsCount
                                            ? t('Спасибо за оценку!')
                                            : title
                                    }
                                />
                            }
                        />
                        <StarRatingDeprecated
                            selectedStars={starsCount}
                            size={40}
                            onSelect={onSelectStars}
                        />
                    </VStack>
                    {isMobile ? (
                        drawerContent
                    ) : (
                        <ModalDeprecated isOpen={isModalOpen} lazy>
                            <div className={cls.rating__modal}>
                                <VStack max gap="32">
                                    {modalContent}
                                    <HStack max gap="16" justify="end">
                                        <ToggleFeatures
                                            feature="isAppRedesigned"
                                            on={
                                                <>
                                                    <Button
                                                        onClick={cancelHandle}
                                                        className={
                                                            cls.rating__button
                                                        }
                                                    >
                                                        {t('Закрыть')}
                                                    </Button>
                                                    <Button
                                                        onClick={acceptHandle}
                                                        className={
                                                            cls.rating__button
                                                        }
                                                    >
                                                        {t('Отправить')}
                                                    </Button>
                                                </>
                                            }
                                            off={
                                                <>
                                                    <ButtonDeprecated
                                                        onClick={cancelHandle}
                                                        className={
                                                            cls.rating__button
                                                        }
                                                    >
                                                        {t('Закрыть')}
                                                    </ButtonDeprecated>
                                                    <ButtonDeprecated
                                                        onClick={acceptHandle}
                                                        className={
                                                            cls.rating__button
                                                        }
                                                    >
                                                        {t('Отправить')}
                                                    </ButtonDeprecated>
                                                </>
                                            }
                                        />
                                    </HStack>
                                </VStack>
                            </div>
                        </ModalDeprecated>
                    )}
                </>
            }
        />
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    className={classNames('', {}, [className])}
                    max
                    padding={'24'}
                    border={'round'}
                >
                    {content}
                </Card>
            }
            off={
                <CardDeprecated
                    className={classNames('', {}, [className])}
                    max
                    theme={CardTheme.BG}
                >
                    {content}
                </CardDeprecated>
            }
        />
    );
});
