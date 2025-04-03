import React from 'react';
import { Form, Select, DatePicker, Button, Row, Col, InputNumber } from 'antd';

// Định nghĩa lại kiểu props của OrderForm để đảm bảo bao gồm `products`
type OrderFormProps = {
    products: { productId: string; productName: string; price: number }[]; // Chắc chắn rằng products có kiểu này
    onSubmit: (values: any) => void;
    editingOrder: any;
};

const OrderForm: React.FC<OrderFormProps> = ({ products, onSubmit, editingOrder }) => {
    const [form] = Form.useForm();

    // Hàm handle thay đổi số lượng sản phẩm
    const handleQuantityChange = (value: number, productId: string, index: number) => {
        const selectedProducts = form.getFieldValue('selectedProducts') || [];
        selectedProducts[index] = { productId, quantity: value };
        form.setFieldsValue({ selectedProducts });
    };

    // Hàm handle thay đổi sản phẩm
    const handleProductChange = (productIds: string[]) => {
        const selectedProducts = productIds.map((productId) => ({
            productId,
            quantity: 1, // Default quantity
        }));
        form.setFieldsValue({ selectedProducts });
    };

    return (
        <Form form={form} layout="vertical" onFinish={onSubmit} initialValues={editingOrder || {}}>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Khách hàng"
                        name="customerName"
                        rules={[{ required: true, message: 'Vui lòng chọn khách hàng' }]}
                    >
                        <Select placeholder="Chọn khách hàng">
                            <Select.Option value="Nguyễn Văn A">Nguyễn Văn A</Select.Option>
                            <Select.Option value="Trần Thị B">Trần Thị B</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Ngày đặt hàng" name="orderDate">
                        <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Trạng thái" name="orderStatus">
                        <Select>
                            <Select.Option value="Chờ xác nhận">Chờ xác nhận</Select.Option>
                            <Select.Option value="Đang giao">Đang giao</Select.Option>
                            <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
                            <Select.Option value="Hủy">Hủy</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        label="Sản phẩm"
                        name="products"
                        rules={[{ required: true, message: 'Vui lòng chọn sản phẩm' }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Chọn sản phẩm"
                            onChange={handleProductChange}
                            value={form.getFieldValue('products') || []}
                        >
                            {products.map((product) => (
                                <Select.Option key={product.productId} value={product.productId}>
                                    {product.productName} - {product.price} VND
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                {form.getFieldValue('products')?.map((productId: string, index: number) => {
                    const product = products.find((p) => p.productId === productId);
                    return (
                        product && (
                            <Col span={12} key={productId}>
                                <Form.Item name={['selectedProducts', index, 'quantity']}>
                                    <InputNumber
                                        min={1}
                                        defaultValue={1}
                                        onChange={(value) => handleQuantityChange(value ?? 1, productId, index)}
                                    />
                                </Form.Item>
                            </Col>
                        )
                    );
                })}
            </Row>

            <Button type="primary" htmlType="submit">
                {editingOrder ? 'Cập nhật đơn hàng' : 'Thêm đơn hàng'}
            </Button>
        </Form>
    );
};

export default OrderForm;
