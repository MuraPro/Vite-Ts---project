import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { VStack } from "@/shared/ui/Stack";
import { useNotifications } from "../../api/notificationApi";
import { Notification } from "../../model/types/notification";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import cls from "./NotificationList.module.scss";

interface NotificationListProps {
  className?: string;
  mockdata?: Notification[];
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className, mockdata = [] } = props;
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 10000,
  });

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.NotificationList, {}, [className])}
      >
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
      </VStack>
    );
  }

  const dataArr = data! || mockdata;

  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.NotificationList, {}, [className])}
    >
      {dataArr.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </VStack>
  );
});
