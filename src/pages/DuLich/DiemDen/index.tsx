import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Select, Input, Rate, Spin } from 'antd';

const { Option } = Select;

const HomePage: React.FC = () => {
    const {
        destinations,
        getDataDestinations,
        isLoading,
    } = useModel('Dulich');

    const [filteredDestinations, setFiltered] = useState<Destination[]>([]);
    const [filters, setFilters] = useState({
        category: 'all',
        price: null as number | null,
        rating: null as number | null,
    });

    useEffect(() => {
        getDataDestinations();
    }, []);

    useEffect(() => {
        const result = destinations.filter((d) =>
            (filters.category === 'all' || d.category === filters.category) &&
            (filters.price === null || d.price <= filters.price) &&
            (filters.rating === null || d.rating >= filters.rating)
        );
        setFiltered(result);
    }, [filters, destinations]);

    return (
        <div>
            <h1>Khám Phá Điểm Đến</h1>

            <div style={{ marginBottom: 20 }}>
                <Select
                    value={filters.category}
                    onChange={(val) => setFilters({ ...filters, category: val })}
                    style={{ width: 200 }}
                >
                    <Option value="all">Tất cả loại hình</Option>
                    <Option value="beach">Biển</Option>
                    <Option value="mountain">Núi</Option>
                    <Option value="city">Thành phố</Option>
                </Select>

                <Input
                    placeholder="Lọc theo giá"
                    type="number"
                    style={{ width: 200, marginLeft: 10 }}
                    onChange={(e) =>
                        setFilters({ ...filters, price: parseInt(e.target.value) || null })
                    }
                />

                <Rate
                    value={filters.rating || 0}
                    onChange={(val) => setFilters({ ...filters, rating: val })}
                    style={{ marginLeft: 10 }}
                />
            </div>

            {isLoading ? (
                <Spin />
            ) : (
                <Row gutter={[16, 16]}>
                    {filteredDestinations.map((dest) => (
                        <Col key={dest.id} xs={24} sm={12} md={8}>
                            <Card hoverable cover={<img alt={dest.name} src={dest.image} />}>
                                <Card.Meta title={dest.name} description={dest.description} />
                                <p>Loại hình: {dest.category}</p>
                                <p>Giá: {dest.price} VND</p>
                                <Rate disabled value={dest.rating} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default HomePage;
