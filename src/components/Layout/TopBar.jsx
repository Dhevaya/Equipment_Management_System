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
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#001529",
        padding: "0 24px",
        height: "88px",
      }}
    >
      <Title
        level={4}
        style={{ color: "#fff", margin: 0, textAlign: "center" }}
      >
        Equipment Management System
      </Title>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          textAlign: "center",
          columnGap: 6,
          rowGap: 2,
        }}
      >
        <Text style={{ color: "#fff" }}>
          <Text strong style={{ color: "#fff" }}>
            Enterprise:
          </Text>{" "}
          {enterpriseDisplay}
        </Text>
        <Text style={{ color: "#fff" }}>|</Text>
        <Text style={{ color: "#fff" }}>
          <Text strong style={{ color: "#fff" }}>
            Site:
          </Text>{" "}
          {siteDisplay}
        </Text>
        <Text style={{ color: "#fff" }}>|</Text>
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
