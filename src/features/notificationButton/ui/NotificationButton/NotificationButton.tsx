import { memo, useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Popover } from '@/shared/ui/deprecated/Popups';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [_, setIsMobileSize] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <div
            className={classNames(cls.NotificationButton, {}, [className])}
            role="button"
            tabIndex={0}
            onClick={onOpenDrawer}
        >
            <Icon Svg={NotificationIcon} className={className} />
        </div>
    );

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {
        setIsMobileSize(isMobile);
        if (isMobile) {
            setIsOpen(false);
        }
    }, [isMobile]);

    return (
        <div>
            {isMobile ? (
                <>
                    {trigger}
                    <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                        <NotificationList />
                    </Drawer>
                </>
            ) : (
                <Popover
                    className={classNames(cls.NotificationButton, {}, [
                        className,
                    ])}
                    direction="bottom left"
                    trigger={trigger}
                >
                    <NotificationList className={cls.notifications} />
                </Popover>
            )}
        </div>
    );
});
