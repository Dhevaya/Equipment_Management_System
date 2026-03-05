import { useEffect } from "react";
import { Row, Col, Typography } from "antd";
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
    selectEquipmentClass,
  } = useEquipmentClass();

  useEffect(() => {
    loadEquipmentClasses();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Title level={3}>Equipment Classes</Title>

      {error && (
        <div style={{ color: "red", marginBottom: 16 }}>
          Error: {error}
        </div>
      )}

      <Row gutter={24}>
        <Col xs={24} md={8}>
          <EquipmentClassForm
            selectedItem={selectedItem}
            onCreate={createEquipmentClass}
            onUpdate={updateEquipmentClass}
            onReset={() => selectEquipmentClass(null)}
          />
        </Col>

        <Col xs={24} md={16}>
          <EquipmentClassTable
            items={items}
            status={status}
            selectedItem={selectedItem}
            onSelect={selectEquipmentClass}
          />
        </Col>
      </Row>
    </div>
  );
};

export default EquipmentClassList;