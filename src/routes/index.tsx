import { useRoutes } from "react-router-dom";
import { LoginTemplate } from "../layout/LoginTemplate";
import ProjectPage from "../pages/ProjectPage";
import SignupPage from "../pages/SignupPage";

export const RouterConfig = () => {
  const routes = useRoutes([
    {
      element: <LoginTemplate />,
      path: "/login",
    },
    {
      element: <SignupPage />,
      path: "/signup",
    },
    {
      element: <ProjectPage />,
      path: "/project",
    },
  ]);
  return routes;
};

export default RouterConfig;
