
import { Layout } from "antd";
import TopBar from "./components/Layout/TopBar";
import Sidebar from "./components/Layout/Sidebar";

import EquipmentClassList from "./components/EquipmentClass/EquipmentClassList";

const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      <Header style={{ padding: 0, minHeight: 88, height: "auto", lineHeight: "normal" }}>
        <TopBar />
      </Header>

      <Layout>

        <Sidebar />

        <Layout style={{ flex: 1, minWidth: 0 }}>
          <Content
            style={{
              padding: 24,
              background: "#f5f5f5",
              minHeight: "100vh",
            }}
          >
            <EquipmentClassList />

          </Content>
        </Layout>

      </Layout>

    </Layout>
  );
};

export default App;