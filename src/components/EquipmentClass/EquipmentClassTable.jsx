import { useEffect, useMemo, useState } from "react";
import { Table, Tag, Spin, Button, Popconfirm, Space, Empty } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const EquipmentClassTable = ({ items, status, selectedItem, onSelect, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const sortedItems = useMemo(() => {
    return [...(items || [])].sort((a, b) => {
      const dateA = new Date(a.effectiveStartDate || 0).getTime();
      const dateB = new Date(b.effectiveStartDate || 0).getTime();
      return dateB - dateA;
    });
  }, [items]);

  useEffect(() => {
    // Keep users on the first page after data changes so new entries are visible.
    setCurrentPage(1);
  }, [sortedItems.length]);

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

  if (!items || items.length === 0) {
    return (
      <Spin spinning={status === "loading"}>
        <Empty description="No Equipment Classes Found" />
      </Spin>
    );
  }

  return (
    <Spin spinning={status === "loading"}>
      <Table
        columns={columns}
        dataSource={sortedItems}
        rowKey="autoId"
        rowClassName={(record) =>
          selectedItem?.autoId === record.autoId ? "selected-row" : ""
        }
        pagination={{
          current: currentPage,
          pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
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

export default EquipmentClassTable;
