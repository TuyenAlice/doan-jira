import { useRoutes } from "react-router-dom";
import { LoginTemplate } from "../layout/LoginTemplate";
import ProjectPage from "../pages/ProjectPage";
import SignupPage from "../pages/SignupPage";
import GetUsers from "../components/GetUsers";
import KanbanPage from "../pages/KanbanPage";

export const RouterConfig = () => {
  const routes = useRoutes([
    {
      element: <LoginTemplate />,
      path: "/",
    },
    {
      element: <SignupPage />,
      path: "/signup",
    },
    {
      element: <ProjectPage />,
      path: "/project",
    },
    {
      element: <GetUsers />,
      path: "/usermanagement",
    },
    {
      element: <KanbanPage />,
      path: "/dashboard",
    },
  ]);
  return routes;
};

export default RouterConfig;
