import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { AppRouteByPathPattern, AppRoutes } from '@/shared/const/router';

export function useRouteChange() {
    const location = useLocation();

    const initialRoute = Object.entries(
        AppRouteByPathPattern,
    ).reduce<AppRoutes>(
        (acc, [pattern, route]) =>
            matchPath(pattern, location.pathname) ? route : acc,
        AppRoutes.MAIN,
    );

    const [appRoute, setAppRoute] = useState<AppRoutes>(initialRoute);

    useEffect(() => {
        Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
            if (matchPath(pattern, location.pathname)) {
                setAppRoute(route);
            }
        });
    }, [location.pathname]);

    return appRoute;
}
