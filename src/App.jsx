import { Layout } from "antd";
import TopBar from "./components/Layout/TopBar";
import Sidebar from "./components/Layout/Sidebar";

const { Content } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <TopBar />
      <Layout>
        <Sidebar />
        <Layout style={{ padding: "24px" }}>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {/* Main content area — routes will be added in a later phase */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
