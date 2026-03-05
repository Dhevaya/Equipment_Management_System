import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Typography } from "antd";
import useProperties from "../../hooks/useProperties";
import PropertiesForm from "./PropertiesForm";
import PropertiesTable from "./PropertiesTable";

const { Title, Text } = Typography;

const PropertiesList = () => {
  const selectedEquipmentClass = useSelector(
    (state) => state.equipmentClass.selectedItem
  );
  const {
    items,
    status,
    error,
    loadProperties,
    createProperty,
    updateProperty,
  } = useProperties();

  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    if (selectedEquipmentClass) {
      loadProperties(selectedEquipmentClass.autoId);
      setSelectedProperty(null);
    }
  }, [selectedEquipmentClass]);

  if (!selectedEquipmentClass) {
    return (
      <div style={{ padding: 24 }}>
        <Text type="secondary">Select Equipment Class to view properties</Text>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <Title level={4}>
        Properties — {selectedEquipmentClass.id}
      </Title>
      {error && (
        <div style={{ color: "red", marginBottom: 16 }}>Error: {error}</div>
      )}
      <Row gutter={24}>
        <Col xs={24} md={8}>
          <PropertiesForm
            selectedProperty={selectedProperty}
            equipmentClassAutoId={selectedEquipmentClass.autoId}
            onCreate={createProperty}
            onUpdate={updateProperty}
            onReset={() => setSelectedProperty(null)}
          />
        </Col>
        <Col xs={24} md={16}>
          <PropertiesTable
            items={items}
            status={status}
            selectedProperty={selectedProperty}
            onSelect={setSelectedProperty}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PropertiesList;
