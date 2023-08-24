import { MainPageAsync } from "pages/MainPage"
import { RouteObject } from "react-router-dom"

export enum AppRoutes {
    MAIN = 'main',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
}

export const RouterConfig: Record<AppRoutes, RouteObject> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPageAsync />
    }
}