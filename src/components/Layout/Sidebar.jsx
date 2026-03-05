
import { Layout, Menu } from "antd";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const items = [
  {
    key: "equipment",
    icon: <AppstoreOutlined />,
    label: "Equipment Classes",
  },
  {
    key: "properties",
    icon: <UnorderedListOutlined />,
    label: "Properties",
  },
];

const Sidebar = ({ selectedPage, setSelectedPage }) => {
  return (
    <Sider
      width={220}
      breakpoint="lg"
      collapsedWidth="0"
      style={{ background: "#fff" }}
    >
      <Menu
        mode="inline"
        selectedKeys={[selectedPage]}
        items={items}
        onClick={(e) => setSelectedPage(e.key)}
        style={{ height: "100%", borderRight: 0 }}
      />
    </Sider>
  );
};

export default Sidebar;