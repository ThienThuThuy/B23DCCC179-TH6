interface Employee {
    id: string;
    name: string;
    position: string;
    department: string;
    salary: number;
    contractStatus: 'TRV' | 'CTC';
}

interface Order {
    orderId: string;            // Mã đơn hàng
    customerName: string;       // Tên khách hàng
    orderDate: string;          // Ngày đặt hàng (có thể là chuỗi kiểu 'yyyy-mm-dd')
    totalAmount: number;        // Tổng tiền của đơn hàng
    orderStatus: 'Chờ xác nhận' | 'Đang giao' | 'Hoàn thành' | 'Hủy'; // Trạng thái đơn hàng
    products: Product[];        // Danh sách các sản phẩm trong đơn hàng
}

interface Product {
    productId: string;          // Mã sản phẩm
    productName: string;        // Tên sản phẩm
    quantity: number;           // Số lượng sản phẩm trong đơn hàng
    price: number;              // Giá của sản phẩm
}
