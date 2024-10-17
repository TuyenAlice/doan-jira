import { useRoutes } from "react-router-dom";
import { LoginTemplate } from "../layout/LoginTemplate";
import ProjectPage from "../pages/ProjectPage";
import SignupPage from "../pages/SignupPage";
import GetUsers from "../components/GetUsers";

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
    // {
    //   element: <Dashboad />,
    //   path: "/Dashboard",
    // },
  ]);
  return routes;
};

export default RouterConfig;
