import { useState, useEffect } from 'react';
import { getEmployee, saveEmployee } from '@/services/Employee';
import { message } from 'antd';

export default () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ position: '', department: '', searchText: '' });
    const [searchText, setSearchText] = useState<string>(''); // Tìm kiếm theo tên

    // Tải dữ liệu từ localStorage khi component mount
    useEffect(() => {
        const loadedEmployees = getEmployee(); // lấy từ localStorage
        setEmployees(loadedEmployees); // set dữ liệu vào state
        setLoading(false); // set loading = false sau khi đã tải dữ liệu
    }, []); // Chạy chỉ một lần khi component mount

    const generateId = (status: 'TRV' | 'CTC'): string => `${status}-${Date.now()}`;

    // Thêm nhân viên
    const addEmployee = (newEmployee: Omit<Employee, 'id'>) => {
        const id = generateId(newEmployee.contractStatus); // tự động sinh mã nhân viên
        const newEmployeeWithId = { ...newEmployee, id };
        const updatedEmployees = [...employees, newEmployeeWithId]; // thêm vào danh sách nhân viên
        setEmployees(updatedEmployees); // cập nhật state
        saveEmployee(updatedEmployees); // lưu vào localStorage
        message.success('Thêm nhân viên thành công!');
    };

    // Sửa thông tin nhân viên
    const editEmployee = (updatedEmployee: Employee) => {
        const updatedEmployees = employees.map(emp =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
        ); // cập nhật nhân viên trong danh sách
        setEmployees(updatedEmployees); // cập nhật state
        saveEmployee(updatedEmployees); // lưu vào localStorage
        message.success('Cập nhật nhân viên thành công!');
    };

    // Xóa nhân viên
    const deleteEmployee = (id: string) => {
        const empToDelete = employees.find(e => e.id === id);
        if (!empToDelete) return;

        if (empToDelete.contractStatus !== 'TRV') {
            message.warning('Chỉ có thể xóa nhân viên thử việc!');
            return;
        }

        const updatedEmployees = employees.filter(emp => emp.id !== id); // lọc bỏ nhân viên bị xóa
        setEmployees(updatedEmployees); // cập nhật state
        saveEmployee(updatedEmployees); // lưu vào localStorage
        message.success('Xóa nhân viên thành công!');
    };

    // Lọc nhân viên theo các bộ lọc
    const filteredEmployees = employees
        .filter(employee => {
            return (
                (filters.position ? employee.position === filters.position : true) &&
                (filters.department ? employee.department === filters.department : true) &&
                (filters.searchText
                    ? employee.id.includes(filters.searchText) || employee.name.includes(filters.searchText)
                    : true)
            );
        })
        .sort((a, b) => b.salary - a.salary); // Sắp xếp theo lương giảm dần


    // Hàm thay đổi bộ lọc
    const handleFilterChange = (value: string, key: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    return {
        employees: filteredEmployees,
        loading,
        addEmployee,
        editEmployee,
        deleteEmployee,
        filters,
        filteredEmployees,
        setFilters,
        searchText,
        setSearchText,
        handleFilterChange,
    };
};
