import { useEffect } from "react";
import { Form, Input, InputNumber, DatePicker, Button, Space } from "antd";
import dayjs from "dayjs";

const PropertiesForm = ({
  selectedProperty,
  equipmentClassAutoId,
  items,
  onCreate,
  onUpdate,
  onReset,
}) => {
  const [form] = Form.useForm();
  const isEditMode = !!selectedProperty;

  useEffect(() => {
    if (selectedProperty) {
      form.setFieldsValue({
        id: selectedProperty.id,
        description: selectedProperty.description,
        value: selectedProperty.value,
        uom: selectedProperty.uom,
        effectiveStartDate: selectedProperty.effectiveStartDate
          ? dayjs(selectedProperty.effectiveStartDate)
          : null,
        effectiveEndDate: selectedProperty.effectiveEndDate
          ? dayjs(selectedProperty.effectiveEndDate)
          : null,
      });
    } else {
      form.resetFields();
    }
  }, [selectedProperty, form]);

  const handleCreate = () => {
    const startDate = new Date().toISOString();

    form.setFieldsValue({
      effectiveStartDate: dayjs(startDate),
    });

    form.validateFields().then((values) => {
      onCreate({
        id: values.id,
        description: values.description,
        value: values.value,
        uom: values.uom,
        equipmentClassAutoId,
        effectiveStartDate: startDate,
        effectiveEndDate: values.effectiveEndDate
          ? values.effectiveEndDate.toISOString()
          : null,
      });
      form.resetFields();
    });
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      onUpdate({
        autoId: selectedProperty.autoId,
        id: selectedProperty.id,
        description: values.description,
        value: values.value,
        uom: values.uom,
        equipmentClassAutoId: selectedProperty.equipmentClassAutoId,
        effectiveStartDate: values.effectiveStartDate
          ? values.effectiveStartDate.toISOString()
          : selectedProperty.effectiveStartDate,
        effectiveEndDate: values.effectiveEndDate
          ? values.effectiveEndDate.toISOString()
          : null,
      });
      form.resetFields();
      onReset();
    });
  };

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Property ID"
        name="id"
        rules={[
          { required: true, message: "Property ID is required" },
          { max: 50, message: "Max 50 characters" },
          {
            pattern: /^\S+$/,
            message: "Property ID must not contain spaces",
          },
          {
            validator: (_, value) => {
              if (!value || isEditMode) return Promise.resolve();
              const duplicate = (items || []).find(
                (item) => item.id === value
              );
              if (duplicate) {
                return Promise.reject(
                  new Error("Property ID must be unique within this equipment class")
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input disabled={isEditMode} placeholder="Enter property ID" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Description is required" }]}
      >
        <Input.TextArea rows={3} placeholder="Enter description" />
      </Form.Item>

      <Form.Item
        label="Value"
        name="value"
        rules={[
          {
            required: true,
            message: "Value is required",
          },
          {
            type: "number",
            message: "Value must be numeric",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} placeholder="Enter value" />
      </Form.Item>

      <Form.Item
        label="Unit of Measure (UOM)"
        name="uom"
        rules={[{ required: true, message: "UOM is required" }]}
      >
        <Input placeholder="Enter UOM" />
      </Form.Item>

      <Form.Item
        label="Effective Start Date"
        name="effectiveStartDate"
        rules={[
          { required: true, message: "Effective Start Date is required" },
        ]}
      >
        <DatePicker style={{ width: "100%" }} disabled={!isEditMode} />
      </Form.Item>

      <Form.Item
        label="Effective End Date"
        name="effectiveEndDate"
        rules={[
          { required: true, message: "Effective End Date is required" },
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              const startDate = form.getFieldValue("effectiveStartDate");
              if (startDate && !dayjs(value).isAfter(dayjs(startDate))) {
                return Promise.reject(
                  new Error("End date must be after start date")
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" onClick={handleCreate} disabled={isEditMode}>
            Create
          </Button>
          <Button type="primary" onClick={handleUpdate} disabled={!isEditMode}>
            Update
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default PropertiesForm;
