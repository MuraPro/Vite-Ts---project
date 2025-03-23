import { FaHome } from 'react-icons/fa';
import { HiInformationCircle } from 'react-icons/hi';
import { ImProfile } from 'react-icons/im';
// import { IoIosCreate } from "react-icons/io";
import { RiArticleFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
// import AboutIconDeprecated from "shared/assets/icons/about-20-20.svg";
// import ArticleIconDeprecated from "shared/assets/icons/article-20-20.svg";
// import MainIconDeprecated from "shared/assets/icons/main-20-20.svg";
// import ProfileIconDeprecated from "shared/assets/icons/profile-20-20.svg";
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';
import { SidebarItemType } from '../types/sidebar';

export const useSidebarItems = () => {
    const userData = useSelector(getUserAuthData);
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            //   Icon: MainIconDeprecated,
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => FaHome,
                on: () => MainIcon,
            }),
            text: 'Главная',
        },
        {
            path: getRouteAbout(),
            //   Icon: AboutIconDeprecated,
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => HiInformationCircle,
                on: () => AboutIcon,
            }),
            text: 'О нас',
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                // Icon: ProfileIconDeprecated,
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ImProfile,
                    on: () => ProfileIcon,
                }),
                text: 'Профиль',
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                // Icon: ArticleIconDeprecated,
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => RiArticleFill,
                    on: () => ArticleIcon,
                }),
                text: 'Статьи',
                authOnly: true,
            },
            //   {
            //     path: getRouteArticleCreate(),
            //     // Icon: ArticleIcon,
            //     Icon: IoIosCreate,
            //     text: "Создать статью",
            //     authOnly: true,
            //   },
        );
    }

    return sidebarItemsList;
};
