import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Typography, Input, Card, message } from "antd";
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
    deleteProperty,
  } = useProperties();

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (selectedEquipmentClass) {
      loadProperties(selectedEquipmentClass.autoId);
      setSelectedProperty(null);
      setSearchText("");
    }
  }, [selectedEquipmentClass]);

  const filteredItems = useMemo(() => {
    if (!searchText) return items;
    const lower = searchText.toLowerCase();
    return items.filter(
      (item) =>
        (item.id || "").toLowerCase().includes(lower) ||
        (item.description || "").toLowerCase().includes(lower) ||
        String(item.value || "").toLowerCase().includes(lower) ||
        (item.uom || "").toLowerCase().includes(lower)
    );
  }, [items, searchText]);

  const handleCreate = (data) => {
    createProperty(data).then((res) => {
      if (!res.error) message.success("Property created successfully");
    });
  };

  const handleUpdate = (data) => {
    updateProperty(data).then((res) => {
      if (!res.error) message.success("Property updated successfully");
    });
  };

  const handleDelete = (autoId) => {
    deleteProperty(autoId).then((res) => {
      if (!res.error) message.success("Property deleted successfully");
    });
  };

  if (!selectedEquipmentClass) {
    return (
      <div style={{ padding: 24 }}>
        <Text type="secondary">Select Equipment Class to view properties</Text>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <Title level={4} style={{ wordBreak: "break-word" }}>
        Properties — {selectedEquipmentClass.id}
      </Title>
      {error && (
        <div style={{ color: "red", marginBottom: 16 }}>Error: {error}</div>
      )}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <PropertiesForm
            selectedProperty={selectedProperty}
            equipmentClassAutoId={selectedEquipmentClass.autoId}
            items={items}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onReset={() => setSelectedProperty(null)}
          />
        </Col>
        <Col xs={24} lg={16}>
          <Card>
            <Input.Search
              placeholder="Search Properties"
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            <PropertiesTable
              items={filteredItems}
              status={status}
              selectedProperty={selectedProperty}
              onSelect={setSelectedProperty}
              onDelete={handleDelete}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PropertiesList;
