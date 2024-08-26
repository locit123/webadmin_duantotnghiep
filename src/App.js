// App.jsx
import "./App.scss";
import SiderMenu from "./components/siderMenu/SiderMenu";
import AppHeader from "./components/appHeader/AppHeader";
import AppContent from "./components/appContent/AppContent";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAccessTokenState } from "./store/selector";
import { Layout } from "antd";

function App() {
  const location = useLocation();
  const accessToken = useSelector(getAccessTokenState);
  const path = [
    "/",
    "/users",
    "/notification",
    "/promotions",
    "/order",
    "/tables",
    "/menu",
    "/report",
    "/categories",
    "/profile",
    "/statistical",
    "/reviews",
  ];
  let checkPath = path.includes(location.pathname);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {checkPath && accessToken ? <AppHeader /> : null}
      <Layout>
        {checkPath && accessToken ? <SiderMenu /> : null}
        <Layout>
          <AppContent />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
