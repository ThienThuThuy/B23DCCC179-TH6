import React from 'react';
import { Button, Input, Select } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import useEmployeeModel from '@/models/useEmployeeModel'; // Giả sử đã import hook
import EmployeeTable from './EmployeeTable'; // Import component EmployeeTable
import EmployeeModal from './EmployeeModal'; // Import component EmployeeModal

const { Option } = Select;

const EmployeeListPage: React.FC = () => {
    const {
        loading,
        addEmployee,
        editEmployee,
        deleteEmployee,
        filters,
        setFilters,
        filteredEmployees,
        setSearchText,
    } = useEmployeeModel();

    const [modalVisible, setModalVisible] = React.useState(false);
    const [editingEmployee, setEditingEmployee] = React.useState<Employee | null>(null);

    const showModal = (employee?: Employee) => {
        setModalVisible(true);
        setEditingEmployee(employee || null);
    };

    const handleAddOrEdit = (employee: Employee) => {
        if (editingEmployee) {
            editEmployee({ ...editingEmployee, ...employee });
        } else {
            addEmployee(employee);
        }
        setModalVisible(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleFilterChange = (value: string, key: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    return (
        <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 16, display: 'flex', gap: 10 }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
                    Thêm Nhân Viên
                </Button>
                <Input
                    placeholder="Tìm kiếm nhân viên"
                    onChange={handleSearchChange}
                    style={{ width: 300 }}
                    prefix={<SearchOutlined />}
                />
                <Select
                    value={filters.position}
                    onChange={(value) => handleFilterChange(value, 'position')}
                    placeholder="Lọc theo chức vụ"
                    style={{ width: 200 }}
                >
                    <Option value="">Tất cả</Option>
                    <Option value="Nhân viên">Nhân viên</Option>
                    <Option value="Quản lý">Quản lý</Option>
                    <Option value="Giám đốc">Giám đốc</Option>
                </Select>
                <Select
                    value={filters.department}
                    onChange={(value) => handleFilterChange(value, 'department')}
                    placeholder="Lọc theo phòng ban"
                    style={{ width: 200 }}
                >
                    <Option value="">Tất cả</Option>
                    <Option value="Kinh doanh">Kinh doanh</Option>
                    <Option value="Tài chính">Tài chính</Option>
                    <Option value="Nhân sự">Nhân sự</Option>
                </Select>
            </div>

            <EmployeeTable
                employees={filteredEmployees}
                loading={loading}
                onEdit={showModal}
                onDelete={deleteEmployee}
            />

            <EmployeeModal
                visible={modalVisible}
                employee={editingEmployee}
                onOk={handleAddOrEdit}
                onCancel={() => setModalVisible(false)}
            />
        </div>
    );
};

export default EmployeeListPage;
