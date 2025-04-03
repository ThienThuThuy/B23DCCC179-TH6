import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface EmployeeTableProps {
    employees: Employee[];
    loading: boolean;
    onEdit: (employee: Employee) => void;
    onDelete: (id: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, loading, onEdit, onDelete }) => {
    return (
        <Table
            dataSource={employees}
            rowKey="id"
            loading={loading}
            columns={[
                { title: 'ID', dataIndex: 'id', key: 'id' },
                { title: 'Họ tên', dataIndex: 'name', key: 'name' },
                { title: 'Chức vụ', dataIndex: 'position', key: 'position' },
                { title: 'Phòng ban', dataIndex: 'department', key: 'department' },
                { title: 'Lương', dataIndex: 'salary', key: 'salary', render: (salary: number) => `${salary} VND` },
                { title: 'Trạng thái', dataIndex: 'contractStatus', key: 'contractStatus' },
                {
                    title: 'Hành động',
                    key: 'actions',
                    render: (_, record: Employee) => (
                        <>
                            <Button
                                icon={<EditOutlined />}
                                onClick={() => onEdit(record)}
                                style={{ marginRight: 8 }}
                            />
                            <Popconfirm
                                title="Bạn có chắc chắn muốn xóa?"
                                onConfirm={() => onDelete(record.id)}
                                okText="Xóa"
                                cancelText="Hủy"
                                disabled={record.contractStatus !== 'TRV'}
                            >
                                <Button
                                    icon={<DeleteOutlined />}
                                    danger
                                    disabled={record.contractStatus !== 'TRV'}
                                />
                            </Popconfirm>
                        </>
                    ),
                },
            ]}
        />
    );
};

export default EmployeeTable;
