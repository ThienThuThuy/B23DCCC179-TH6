// src/models/order.ts

// Định nghĩa kiểu dữ liệu cho Product
interface Product {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
}

// Định nghĩa kiểu dữ liệu cho Order
interface Order {
    orderId: string;
    customerName: string;
    orderDate: string;
    orderStatus: 'Chờ xác nhận' | 'Đang giao' | 'Hoàn thành' | 'Hủy';
    totalAmount: number;
    products: Product[];  // Danh sách các sản phẩm trong đơn hàng
}

// Định nghĩa kiểu dữ liệu cho bộ lọc đơn hàng
interface OrderFilters {
    status: string;
    customerName: string;
    searchText: string;
}

