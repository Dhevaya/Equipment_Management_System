
import { Layout, Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const items = [
  {
    key: "equipment",
    icon: <AppstoreOutlined />,
    label: "Equipment Classes",
  },
];

const Sidebar = () => {
  return (
    <Sider
      width={220}
      breakpoint="lg"
      collapsedWidth="0"
      style={{ background: "#fff" }}
    >
      <Menu
        mode="inline"
        selectedKeys={["equipment"]}
        items={items}
        style={{ height: "100%", borderRight: 0 }}
      />
    </Sider>
  );
};

export default Sidebar;