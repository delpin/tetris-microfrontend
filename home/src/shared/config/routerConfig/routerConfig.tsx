import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import TetrisPage from 'tetris/TetrisPage';

// const TetrisPage = React.lazy(() => import('tetris/TetrisPage'))

export enum AppRoutes {
    MAIN = 'main',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
}

export const RouterConfig: Record<AppRoutes, RouteObject> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <TetrisPage />
    }
}