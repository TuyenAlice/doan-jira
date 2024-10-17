import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./routes";
import MenuBar from "./components/MenuBar";
import { Header } from "antd/es/layout/layout";

const App = () => (
  <Router>
    {/* <Header />
    <MenuBar /> */}

    <RouterConfig />
  </Router>
);

export default App;
