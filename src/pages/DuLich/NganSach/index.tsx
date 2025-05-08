import React, { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';
import { Alert, Card, Statistic, Row, Col } from 'antd';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface BudgetAlert {
    message: string;
    type: 'warning' | 'info' | 'success' | 'error';
    valueExceeded?: number;
}

const BudgetManagement: React.FC = () => {
    const { budget, getBudgetFromLocal } = useModel('Dulich');
    const [alert, setAlert] = useState<BudgetAlert | null>(null);
    const [totalSpent, setTotalSpent] = useState<number>(0);

    useEffect(() => {
        getBudgetFromLocal();
    }, []);

    useEffect(() => {
        const spent = budget.accommodation + budget.food + budget.transportation;
        setTotalSpent(spent);
        if (spent > budget.total) {
            setAlert({
                message: `⚠️ Bạn đã vượt ngân sách ${spent - budget.total} VND.`,
                type: 'warning',
                valueExceeded: spent - budget.total,
            });
        } else {
            setAlert({
                message: '✅ Ngân sách nằm trong giới hạn.',
                type: 'success',
            });
        }
    }, [budget]);

    const chartData = {
        labels: ['Lưu trú', 'Ăn uống', 'Di chuyển'],
        datasets: [
            {
                label: 'Chi tiêu (VND)',
                data: [budget.accommodation, budget.food, budget.transportation],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverOffset: 6,
            },
        ],
    };

    return (
        <div style={{ padding: 20, maxWidth: 700, margin: '0 auto' }}>
            <h2>🧾 Quản lý ngân sách chuyến đi</h2>

            {alert && (
                <Alert
                    message="Thông báo ngân sách"
                    description={alert.message}
                    type={alert.type}
                    showIcon
                    style={{ marginBottom: 20 }}
                />
            )}

            <Card title="Biểu đồ phân bổ ngân sách">
                <Pie data={chartData} />
            </Card>

            <Card title="Chi tiết ngân sách" style={{ marginTop: 20 }}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Statistic title="Ngân sách tổng" value={budget.total} suffix="VND" />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Đã chi tiêu" value={totalSpent} suffix="VND" />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Lưu trú" value={budget.accommodation} suffix="VND" />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Ăn uống" value={budget.food} suffix="VND" />
                    </Col>
                    <Col span={6} style={{ marginTop: 16 }}>
                        <Statistic title="Di chuyển" value={budget.transportation} suffix="VND" />
                    </Col>
                    {totalSpent > budget.total && (
                        <Col span={6} style={{ marginTop: 16 }}>
                            <Statistic
                                title="Vượt ngân sách"
                                value={totalSpent - budget.total}
                                suffix="VND"
                                valueStyle={{ color: '#cf1322' }}
                            />
                        </Col>
                    )}
                </Row>
            </Card>
        </div>
    );
};

export default BudgetManagement;
