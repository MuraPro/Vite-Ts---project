import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdDomain } from "react-icons/md";
import { RiInformation2Line } from "react-icons/ri";
// import AboutIcon from "shared/assets/icons/about-20-20.svg";
// import MainIcon from "shared/assets/icons/main-20-20.svg";
// import ProfileIcon from "shared/assets/icons/profile-20-20.svg";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
  authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    // Icon: MainIcon,
    Icon: MdDomain,
    text: "Главная",
  },
  {
    path: RoutePath.about,
    // Icon: AboutIcon,
    Icon: RiInformation2Line,
    text: "О нас",
  },
  {
    path: RoutePath.profile,
    // Icon: ProfileIcon,
    Icon: CgProfile,
    text: "Профиль",
    authOnly: true,
  },
];
