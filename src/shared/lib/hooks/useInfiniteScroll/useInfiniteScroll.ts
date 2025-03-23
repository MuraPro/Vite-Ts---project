//
import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef?: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
    callback,
    wrapperRef,
    triggerRef,
}: UseInfiniteScrollOptions) {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const wrapperElement = wrapperRef?.current || null;
        const triggerElement = triggerRef.current;

        if (callback && triggerElement) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            };

            // Функция срабатывания для наблюдателя
            const handleIntersection = ([
                entry,
            ]: IntersectionObserverEntry[]) => {
                if (entry.isIntersecting) {
                    // После срабатывания запускаем callback
                    callback();
                    // Мы сбрасываем observer, чтобы привязать его к новому триггеру
                    if (observer.current && triggerElement) {
                        observer.current.unobserve(triggerElement); // Убираем старое наблюдение
                        observer.current.observe(triggerElement); // Привязываем снова
                    }
                }
            };

            observer.current = new IntersectionObserver(
                handleIntersection,
                options,
            );

            // Начинаем наблюдение за триггером
            observer.current.observe(triggerElement);

            return () => {
                // Очистка observer на удаление компонента
                if (observer.current && triggerElement) {
                    observer.current.unobserve(triggerElement);
                }
            };
        }
    }, [callback, triggerRef, wrapperRef]);

    // Если callback выполнен, можно сбросить или обновить данные триггера.
    // В зависимости от нужд, можно добавить дополнительные действия здесь.
}
