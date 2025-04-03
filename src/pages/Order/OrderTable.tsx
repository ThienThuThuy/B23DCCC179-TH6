import React from 'react';
import { Table, Button, Popconfirm } from 'antd';

type OrderTableProps = {
    orders: any[];
    loading: boolean;
    handleCancelOrder: (orderId: string) => void;
    openModal: (order?: any) => void;
};

const OrderTable: React.FC<OrderTableProps> = ({ orders, loading, handleCancelOrder, openModal }) => {
    return (
        <Table
            loading={loading}
            dataSource={orders}
            rowKey="orderId"
            columns={[
                { title: 'Mã đơn hàng', dataIndex: 'orderId', key: 'orderId' },
                { title: 'Khách hàng', dataIndex: 'customerName', key: 'customerName' },
                { title: 'Ngày đặt hàng', dataIndex: 'orderDate', key: 'orderDate' },
                { title: 'Tổng tiền', dataIndex: 'totalAmount', key: 'totalAmount' },
                { title: 'Trạng thái', dataIndex: 'orderStatus', key: 'orderStatus' },
                {
                    title: 'Hành động',
                    key: 'action',
                    render: (_, record) => (
                        <div>
                            {record.orderStatus !== 'Hủy' && (
                                <>
                                    <Button onClick={() => openModal(record)} style={{ marginRight: 10 }}>
                                        Sửa
                                    </Button>
                                    <Popconfirm
                                        title="Bạn có chắc muốn hủy đơn hàng này?"
                                        onConfirm={() => handleCancelOrder(record.orderId)} // Gọi hàm handleCancelOrder
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button danger>
                                            Hủy
                                        </Button>
                                    </Popconfirm>
                                </>
                            )}
                        </div>
                    ),
                },
            ]}
            pagination={{ pageSize: 10 }}
        />
    );
};

export default OrderTable;
