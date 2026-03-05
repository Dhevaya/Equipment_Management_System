
import { useState } from "react";
import { Layout } from "antd";
import TopBar from "./components/Layout/TopBar";
import Sidebar from "./components/Layout/Sidebar";

import EquipmentClassList from "./components/EquipmentClass/EquipmentClassList";
import PropertiesList from "./components/EquipmentClassProperties/PropertiesList";

const { Header, Content } = Layout;

const App = () => {

  const [selectedPage, setSelectedPage] = useState("equipment");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      <Header style={{ padding: 0, height: 88, lineHeight: "normal" }}>
        <TopBar />
      </Header>

      <Layout>

        <Sidebar
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />

        <Layout style={{ flex: 1, minWidth: 0 }}>
          <Content
            style={{
              padding: 24,
              background: "#f5f5f5",
              minHeight: "100vh",
            }}
          >

            {selectedPage === "equipment" && <EquipmentClassList />}

            {selectedPage === "properties" && <PropertiesList />}

          </Content>
        </Layout>

      </Layout>

    </Layout>
  );
};

export default App;