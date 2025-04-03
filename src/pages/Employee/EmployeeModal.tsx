import React from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';

const { Option } = Select;

interface EmployeeModalProps {
    visible: boolean;
    employee: Employee | null;
    onOk: (values: Employee) => void;
    onCancel: () => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ visible, employee, onOk, onCancel }) => {
    const [form] = Form.useForm();

    React.useEffect(() => {
        if (employee) {
            form.setFieldsValue(employee);
        } else {
            form.resetFields();
        }
    }, [employee, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onOk(values as Employee);
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };

    return (
        <Modal
            title={employee ? 'Chỉnh Sửa Nhân Viên' : 'Thêm Nhân Viên'}
            visible={visible}
            onCancel={onCancel}
            onOk={handleOk}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="name" label="Họ tên" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="position" label="Chức vụ" rules={[{ required: true }]}>
                    <Select>
                        <Option value="Nhân viên">Nhân viên</Option>
                        <Option value="Quản lý">Quản lý</Option>
                        <Option value="Giám đốc">Giám đốc</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="department" label="Phòng ban" rules={[{ required: true }]}>
                    <Select>
                        <Option value="Kinh doanh">Kinh doanh</Option>
                        <Option value="Tài chính">Tài chính</Option>
                        <Option value="Nhân sự">Nhân sự</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="salary" label="Lương" rules={[{ required: true }]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="contractStatus" label="Trạng thái hợp đồng" rules={[{ required: true }]}>
                    <Select>
                        <Option value="TRV">Thử việc</Option>
                        <Option value="CTC">Chính thức</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EmployeeModal;
