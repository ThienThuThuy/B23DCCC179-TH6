export const STORAGE_KEY_ORDER = 'order';

// Hàm lấy danh sách đơn hàng từ localStorage
export const getOrders = (): Order[] => {
    const saved = localStorage.getItem(STORAGE_KEY_ORDER);
    return saved ? JSON.parse(saved) : []; // Nếu có dữ liệu thì parse, nếu không thì trả về mảng rỗng
};

// Hàm lưu danh sách đơn hàng vào localStorage
export const saveOrders = (orders: Order[]) => {
    localStorage.setItem(STORAGE_KEY_ORDER, JSON.stringify(orders)); // Lưu mảng đơn hàng dưới dạng JSON
};