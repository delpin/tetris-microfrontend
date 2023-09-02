import { memo } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RouterConfig } from "shared/config/routerConfig";

const router = createBrowserRouter(Object.values(RouterConfig));

const RouterProviderComponent = () => {
    return  <RouterProvider router={router} />
}

export default memo(RouterProviderComponent);