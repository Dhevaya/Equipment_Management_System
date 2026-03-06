import { useEffect } from "react";
import { Form, Input, DatePicker, Switch, Button, Space } from "antd";
import dayjs from "dayjs";

const EquipmentClassForm = ({
  selectedItem,
  onCreate,
  onUpdate,
  onReset,
}) => {
  const [form] = Form.useForm();
  const isEditMode = !!selectedItem;

  useEffect(() => {
    if (selectedItem) {
      const startDateValue = selectedItem.effectiveStartDate
        ? dayjs(selectedItem.effectiveStartDate)
        : dayjs();

      form.setFieldsValue({
        id: selectedItem.id,
        description: selectedItem.description,
        effectiveStartDate: startDateValue,
        effectiveEndDate: selectedItem.effectiveEndDate
          ? dayjs(selectedItem.effectiveEndDate)
          : null,
        isActive: selectedItem.isActive,
      });
    } else {
      form.resetFields();
    }
  }, [selectedItem, form]);

  const handleCreate = () => {
    const startDate = new Date().toISOString();

    form.setFieldsValue({
      effectiveStartDate: dayjs(startDate),
    });

    form.validateFields().then((values) => {
      onCreate({
        id: values.id,
        description: values.description,
        effectiveStartDate: startDate,
        effectiveEndDate: values.effectiveEndDate
          ? values.effectiveEndDate.toISOString()
          : null,
        isActive: values.isActive ?? true,
      });

      form.resetFields();
    });
  };

  const handleUpdate = () => {
    if (!form.getFieldValue("effectiveStartDate")) {
      form.setFieldsValue({ effectiveStartDate: dayjs() });
    }

    form.validateFields().then((values) => {
      onUpdate({
        autoId: selectedItem.autoId,
        id: selectedItem.id,
        description: values.description,
        effectiveStartDate:
          selectedItem.effectiveStartDate ||
          (values.effectiveStartDate
            ? values.effectiveStartDate.toISOString()
            : new Date().toISOString()),
        effectiveEndDate: values.effectiveEndDate
          ? values.effectiveEndDate.toISOString()
          : null,
        isActive: values.isActive,
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
    <Form
      form={form}
      layout="vertical"
      initialValues={{ isActive: true }}
    >
      <Form.Item
        label="ID"
        name="id"
        rules={[
          { required: true, message: "ID is required" },
          { max: 50, message: "Max 50 characters" },
          {
            pattern: /^\S+$/,
            message: "ID must not contain spaces",
          },
        ]}
      >
        <Input disabled={isEditMode} placeholder="Enter equipment class ID" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Description is required" },
          { max: 255, message: "Max 255 characters" },
        ]}
      >
        <Input.TextArea rows={3} placeholder="Enter description" />
      </Form.Item>

      <Form.Item
        label="Effective Start Date"
        name="effectiveStartDate"
        rules={[
          { required: true, message: "Effective Start Date is required" },
        ]}
      >
        <DatePicker style={{ width: "100%" }} disabled />
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

      <Form.Item label="Is Active" name="isActive" valuePropName="checked">
        <Switch />
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

export default EquipmentClassForm;
