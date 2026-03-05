import { Table, Spin, Button, Popconfirm, Space, Empty } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const PropertiesTable = ({ items, status, selectedProperty, onSelect, onDelete }) => {
  const columns = [
    {
      title: "Property ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => (a.id || "").localeCompare(b.id || ""),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      sorter: (a, b) => (a.description || "").localeCompare(b.description || ""),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      sorter: (a, b) => Number(a.value || 0) - Number(b.value || 0),
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
      sorter: (a, b) =>
        new Date(a.effectiveStartDate || 0) - new Date(b.effectiveStartDate || 0),
      render: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
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
            title="Are you sure you want to delete this property?"
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

  if (!items || items.length === 0) {
    return (
      <Spin spinning={status === "loading"}>
        <Empty description="No Properties Found" />
      </Spin>
    );
  }

  return (
    <Spin spinning={status === "loading"}>
      <Table
        columns={columns}
        dataSource={items}
        rowKey="autoId"
        rowClassName={(record) =>
          selectedProperty?.autoId === record.autoId ? "selected-row" : ""
        }
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        scroll={{ x: true }}
        onRow={(record) => ({
          onClick: () => onSelect(record),
          style: { cursor: "pointer" },
        })}
      />
    </Spin>
  );
};

export default PropertiesTable;
