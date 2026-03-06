import { useSelector } from "react-redux";
import { Typography } from "antd";

const { Title, Text } = Typography;

const TopBar = () => {
  const enterprise = useSelector((state) => state.hierarchy.enterprise);
  const site = useSelector((state) => state.hierarchy.site);
  const area = useSelector((state) => state.hierarchy.area);

  const enterpriseDisplay = enterprise.id?.replace(/^Enterprise/i, "") || "";
  const siteDisplay = site.id?.replace(/^Site/i, "") || "";
  const areaDisplay = area.id?.replace(/^Area/i, "") || "";

  return (
    <div
      className="topbar-container"
    >
      <Title
        level={4}
        className="topbar-title"
      >
        Equipment Management System
      </Title>

      <div className="topbar-hierarchy">
        <Text style={{ color: "#fff" }}>
          <Text strong style={{ color: "#fff" }}>
            Enterprise:
          </Text>{" "}
          {enterpriseDisplay}
        </Text>
        <Text className="topbar-separator" style={{ color: "#fff" }}>|</Text>
        <Text style={{ color: "#fff" }}>
          <Text strong style={{ color: "#fff" }}>
            Site:
          </Text>{" "}
          {siteDisplay}
        </Text>
        <Text className="topbar-separator" style={{ color: "#fff" }}>|</Text>
        <Text style={{ color: "#fff" }}>
          <Text strong style={{ color: "#fff" }}>
            Area:
          </Text>{" "}
          {areaDisplay}
        </Text>
      </div>
    </div>
  );
};

export default TopBar;
