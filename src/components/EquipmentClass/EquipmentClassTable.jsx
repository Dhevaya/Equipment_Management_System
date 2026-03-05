import { Table, Tag, Spin, Button, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const EquipmentClassTable = ({ items, status, selectedItem, onSelect, onDelete }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      sorter: (a, b) => (a.description || "").localeCompare(b.description || ""),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
      render: (isActive) =>
        isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: "Created",
      dataIndex: "effectiveStartDate",
      key: "effectiveStartDate",
      sorter: (a, b) =>
        new Date(a.effectiveStartDate || 0) - new Date(b.effectiveStartDate || 0),
      render: (date) => (date ? dayjs(date).format("YYYY-MM-DD HH:mm") : "-"),
    },
    {
      title: "Modified",
      dataIndex: "effectiveEndDate",
      key: "effectiveEndDate",
      render: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(record);
            }}
          />
          <Popconfirm
            title="Are you sure you want to delete this equipment class?"
            onConfirm={(e) => {
              e.stopPropagation();
              onDelete(record.autoId);
            }}
            onCancel={(e) => e.stopPropagation()}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={status === "loading"}>
      <Table
        columns={columns}
        dataSource={items}
        rowKey="autoId"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        scroll={{ x: true }}
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
