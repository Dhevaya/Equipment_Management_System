import { Layout, Menu } from "antd";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const menuItems = [
  {
    key: "equipment-classes",
    icon: <AppstoreOutlined />,
    label: "Equipment Classes",
  },
  {
    key: "properties",
    icon: <UnorderedListOutlined />,
    label: "Properties",
  },
];

const Sidebar = () => {
  return (
    <Sider width={220} style={{ background: "#fff" }}>
      <Menu mode="inline" defaultSelectedKeys={["equipment-classes"]} items={menuItems} style={{ height: "100%", borderRight: 0 }} />
    </Sider>
  );
};

export default Sidebar;
