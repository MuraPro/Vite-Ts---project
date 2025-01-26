import { memo, useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NotificationList } from "@/entities/Notification";
import NotificationIcon from "@/shared/assets/icons/notification-20-20.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Drawer } from "@/shared/ui/Drawer";
import { Icon } from "@/shared/ui/Icon";
import { Popover } from "@/shared/ui/Popups";
import cls from "./NotificationButton.module.scss";

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
      className={cls.Notification__btn}
      role="button"
      tabIndex={0}
      onClick={onOpenDrawer}
    >
      <Icon Svg={NotificationIcon} />
    </div>
  );

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

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
          className={classNames(cls.NotificationButton, {}, [className])}
          direction="bottom left"
          trigger={trigger}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      )}
    </div>
  );
});
