// OrderManagement.tsx

import React, { useState } from 'react';


import { message, Modal, Button, Table, Input, Select, Form, Row, Col, DatePicker, Popconfirm, InputNumber } from 'antd';

import OrderForm from './OrderForm'; // Import OrderForm component
import OrderTable from './OrderTable'; // Import OrderTable component
import useOrderModel from '@/models/useOrderModel';

const OrderManagement = () => {
    const {
        orders,
        loading,
        addOrder,
        editOrder,
        deleteOrder,
        handleCancelOrder,
        setSearchText,
        generateOrderId,
        searchText,
        handleFilterChange,
        filters,

    } = useOrderModel();

    const [showModal, setShowModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState<any | null>(null);

    // Dữ liệu sản phẩm mẫu (bạn có thể thay thế bằng dữ liệu thực tế từ API hoặc database)
    const products = [
        { productId: '1', productName: 'Sản phẩm A', price: 100000 },
        { productId: '2', productName: 'Sản phẩm B', price: 200000 },
        { productId: '3', productName: 'Sản phẩm C', price: 150000 },
    ];

    // Mở modal với đơn hàng đã có (nếu có) hoặc thêm đơn hàng mới
    const openModal = (order?: any) => {
        setEditingOrder(order || null);
        setShowModal(true);
    };

    // Xử lý submit form
    const handleSubmit = (values: any) => {
        // Nếu không phải đơn hàng đang chỉnh sửa, tạo ID mới cho đơn hàng
        if (!editingOrder) {
            values.orderId = generateOrderId(); // Tạo mã ID tự động nếu là đơn hàng mới
        } else {
            values.orderId = editingOrder.orderId; // Giữ nguyên mã ID nếu chỉnh sửa
        }

        // Kiểm tra nếu mã đơn hàng đã tồn tại trong hệ thống
        if (orders.some((order) => order.orderId === values.orderId && order.orderId !== editingOrder?.orderId)) {
            message.error('Mã đơn hàng đã tồn tại');
            return;
        }

        // Nếu đang chỉnh sửa, gọi hàm chỉnh sửa, ngược lại gọi hàm thêm mới
        if (editingOrder) {
            editOrder({ ...editingOrder, ...values });
        } else {
            addOrder(values);
        }

        // Đóng modal sau khi xử lý
        setShowModal(false);
    };

    return (
        <div>
            {/* Nút thêm đơn hàng */}
            <Button onClick={() => openModal()} type="primary" style={{ marginBottom: '20px' }}>
                Thêm đơn hàng
            </Button>

            <Input
                placeholder="Tìm kiếm mã đơn hàng hoặc tên khách hàng"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ marginBottom: '20px', width: '300px' }} // Thêm marginBottom để tạo khoảng cách dưới ô tìm kiếm
            />

            {/* Lọc trạng thái */}
            <Select
                placeholder="Lọc theo trạng thái"
                value={filters.status}
                onChange={value => handleFilterChange(value, 'status')}
                style={{ marginBottom: '20px', width: '300px' }} // Thêm marginBottom để tạo khoảng cách dưới Select
            >
                <Select.Option value="">Tất cả trạng thái</Select.Option>
                <Select.Option value="Chờ xác nhận">Chờ xác nhận</Select.Option>
                <Select.Option value="Đang giao">Đang giao</Select.Option>
                <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
                <Select.Option value="Hủy">Hủy</Select.Option>
            </Select>

            {/* Bảng đơn hàng */}
            <OrderTable
                orders={orders}
                loading={loading}
                handleCancelOrder={handleCancelOrder}
                openModal={openModal}
            />

            {/* Modal để thêm hoặc chỉnh sửa đơn hàng */}
            <Modal
                title={editingOrder ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng'}
                visible={showModal}
                onCancel={() => setShowModal(false)}
                footer={null}
            >
                <OrderForm
                    products={products} // Truyền dữ liệu sản phẩm vào form
                    onSubmit={handleSubmit}
                    editingOrder={editingOrder} // Truyền đơn hàng đang chỉnh sửa (nếu có)
                />
            </Modal>
        </div>
    );
};

export default OrderManagement;
