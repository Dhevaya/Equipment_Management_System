import { useSelector } from "react-redux";
import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Text } = Typography;

const TopBar = () => {
  const enterprise = useSelector((state) => state.hierarchy.enterprise);
  const site = useSelector((state) => state.hierarchy.site);
  const area = useSelector((state) => state.hierarchy.area);

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        background: "#001529",
        padding: "0 24px",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 16 }}>
        {enterprise.id} | {site.id} | {area.id}
      </Text>
    </Header>
  );
};

export default TopBar;
