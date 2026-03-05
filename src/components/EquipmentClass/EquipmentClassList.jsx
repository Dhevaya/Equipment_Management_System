import { useEffect, useState, useMemo } from "react";
import { Row, Col, Typography, Input, Card, message } from "antd";
import useEquipmentClass from "../../hooks/useEquipmentClass";
import EquipmentClassForm from "./EquipmentClassForm";
import EquipmentClassTable from "./EquipmentClassTable";

const { Title } = Typography;

const EquipmentClassList = () => {
  const {
    items,
    selectedItem,
    status,
    error,
    loadEquipmentClasses,
    createEquipmentClass,
    updateEquipmentClass,
    deleteEquipmentClass,
    selectEquipmentClass,
  } = useEquipmentClass();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadEquipmentClasses();
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchText) return items;
    const lower = searchText.toLowerCase();
    return items.filter(
      (item) =>
        (item.id || "").toLowerCase().includes(lower) ||
        (item.description || "").toLowerCase().includes(lower)
    );
  }, [items, searchText]);

  const handleCreate = (data) => {
    createEquipmentClass(data).then((res) => {
      if (!res.error) message.success("Equipment class created successfully");
    });
  };

  const handleUpdate = (data) => {
    updateEquipmentClass(data).then((res) => {
      if (!res.error) message.success("Equipment class updated successfully");
    });
  };

  const handleDelete = (autoId) => {
    deleteEquipmentClass(autoId).then((res) => {
      if (!res.error) message.success("Equipment class deleted successfully");
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <Title level={3} style={{ wordBreak: "break-word", marginBottom: 24 }}>Equipment Classes</Title>

      {error && (
        <div style={{ color: "red", marginBottom: 16 }}>
          Error: {error}
        </div>
      )}

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card title="Equipment Class Form">
            <EquipmentClassForm
              selectedItem={selectedItem}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              onReset={() => selectEquipmentClass(null)}
            />
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="Equipment Classes">
            <Input.Search
              placeholder="Search Equipment Classes"
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            <EquipmentClassTable
              items={filteredItems}
              status={status}
              selectedItem={selectedItem}
              onSelect={selectEquipmentClass}
              onDelete={handleDelete}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EquipmentClassList;