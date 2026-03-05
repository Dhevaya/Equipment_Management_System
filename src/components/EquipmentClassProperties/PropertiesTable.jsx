import { Table, Spin } from "antd";
import dayjs from "dayjs";

const columns = [
  {
    title: "Property ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "UOM",
    dataIndex: "uom",
    key: "uom",
  },
  {
    title: "Created",
    dataIndex: "effectiveStartDate",
    key: "effectiveStartDate",
    render: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
  },
  {
    title: "Modified",
    dataIndex: "effectiveEndDate",
    key: "effectiveEndDate",
    render: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
  },
];

const PropertiesTable = ({ items, status, selectedProperty, onSelect }) => {
  return (
    <Spin spinning={status === "loading"}>
      <Table
        columns={columns}
        dataSource={items}
        rowKey="autoId"
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: () => onSelect(record),
          style: {
            cursor: "pointer",
            background:
              selectedProperty && selectedProperty.autoId === record.autoId
                ? "#e6f7ff"
                : undefined,
          },
        })}
      />
    </Spin>
  );
};

export default PropertiesTable;
