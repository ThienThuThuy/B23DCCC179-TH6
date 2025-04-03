// src/hooks/useOrderManagement.ts
import { useState, useEffect } from 'react';
import { getOrders, saveOrders } from '@/services/Order'; // Đảm bảo có hàm getOrders và saveOrders trong service
import { message } from 'antd';

export default () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState<OrderFilters>({ status: '', customerName: '', searchText: '' });
    const [searchText, setSearchText] = useState<string>('');

    // Hàm hủy đơn hàng


    useEffect(() => {
        const loadedOrders = getOrders();
        setOrders(loadedOrders);
        setLoading(false);
    }, []);

    const generateOrderId = (): string => `ORD-${Date.now()}`;

    const addOrder = (newOrder: Omit<Order, 'orderId'>) => {
        if (!newOrder.customerName || !newOrder.products.length) {
            message.error('Vui lòng điền đầy đủ thông tin đơn hàng!');
            return;
        }
        const orderId = generateOrderId();
        const totalAmount = newOrder.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        const orderWithId = { ...newOrder, orderId, totalAmount };
        const updatedOrders = [...orders, orderWithId];
        setOrders(updatedOrders);
        saveOrders(updatedOrders);
        message.success('Thêm đơn hàng thành công!');
    };

    const editOrder = (updatedOrder: Order) => {
        if (!updatedOrder.customerName || !updatedOrder.products.length) {
            message.error('Vui lòng điền đầy đủ thông tin đơn hàng!');
            return;
        }
        const totalAmount = updatedOrder.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        const updatedOrderWithTotal = { ...updatedOrder, totalAmount };
        const updatedOrders = orders.map(order => order.orderId === updatedOrderWithTotal.orderId ? updatedOrderWithTotal : order);
        setOrders(updatedOrders);
        saveOrders(updatedOrders);
        message.success('Cập nhật đơn hàng thành công!');
    };

    const handleCancelOrder = (orderId: string) => {
        const order = orders.find(order => order.orderId === orderId);
        if (order && order.orderStatus === 'Chờ xác nhận') {
            // Hàm xóa đơn hàng
            deleteOrder(orderId);
        } else {
            message.error('Chỉ có thể hủy đơn hàng có trạng thái "Chờ xác nhận"');
        }
    };

    // Hàm xóa đơn hàng
    const deleteOrder = (orderId: string) => {
        const updatedOrders = orders.filter(order => order.orderId !== orderId);
        setOrders(updatedOrders);
        message.success('Đơn hàng đã được xóa');
    };
    const filteredOrders = orders
        .filter(order => {
            return (
                (filters.status ? order.orderStatus === filters.status : true) &&
                (filters.searchText ? order.orderId.includes(filters.searchText) || order.customerName.includes(filters.searchText) : true)
            );
        })
        .sort((a, b) => b.orderDate.localeCompare(a.orderDate));

    const handleFilterChange = (value: string, key: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const handleSearch = (value: string) => {
        setSearchText(value);
        setFilters(prevFilters => ({
            ...prevFilters,
            searchText: value,
        }));
    };

    return {
        orders: filteredOrders,
        loading,
        addOrder,
        editOrder,
        deleteOrder,
        filters,
        setFilters,
        searchText,
        setSearchText: handleSearch,
        handleFilterChange,
        handleCancelOrder,
        generateOrderId,
    };
};
