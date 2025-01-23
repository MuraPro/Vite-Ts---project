import { createSelector } from "@reduxjs/toolkit";
import { FaHome } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
// import { IoIosCreate } from "react-icons/io";
import { RiArticleFill } from "react-icons/ri";
import { getUserAuthData } from "@/entities/User";
// import AboutIcon from "shared/assets/icons/about-20-20.svg";
// import ArticleIcon from "shared/assets/icons/article-20-20.svg";
// import MainIcon from "shared/assets/icons/main-20-20.svg";
// import ProfileIcon from "shared/assets/icons/profile-20-20.svg";
import { RoutePath } from "@/shared/const/router";
import { SidebarItemType } from "../types/sidebar";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath.main,
      //   Icon: MainIcon,
      Icon: FaHome,
      text: "Главная",
    },
    {
      path: RoutePath.about,
      //   Icon: AboutIcon,
      Icon: HiInformationCircle,
      text: "О нас",
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: RoutePath.profile + userData.id,
        // Icon: ProfileIcon,
        Icon: ImProfile,
        text: "Профиль",
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        // Icon: ArticleIcon,
        Icon: RiArticleFill,
        text: "Статьи",
        authOnly: true,
      },
      //   {
      //     path: RoutePath.article_create,
      //     // Icon: ArticleIcon,
      //     Icon: IoIosCreate,
      //     text: "Создать статью",
      //     authOnly: true,
      //   },
    );
  }

  return sidebarItemsList;
});
