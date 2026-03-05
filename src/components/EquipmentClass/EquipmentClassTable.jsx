import { Table, Tag, Spin } from "antd";
import dayjs from "dayjs";

const columns = [
  {
    title: "ID",
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
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive) =>
      isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
  },
  {
    title: "Created",
    dataIndex: "effectiveStartDate",
    key: "effectiveStartDate",
    render: (date) => (date ? dayjs(date).format("YYYY-MM-DD HH:mm") : "-"),
  },
  {
    title: "Modified",
    dataIndex: "effectiveEndDate",
    key: "effectiveEndDate",
    render: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
  },
];

const EquipmentClassTable = ({ items, status, selectedItem, onSelect }) => {
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
              selectedItem && selectedItem.autoId === record.autoId
                ? "#e6f7ff"
                : undefined,
          },
        })}
      />
    </Spin>
  );
};

export default EquipmentClassTable;
