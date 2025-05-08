import React, { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';
import { Button, Card, Col, Input, message, Row, Select, Spin } from 'antd';

const { Option } = Select;

interface Destination {
    id: string;
    name: string;
    image: string;
    price: number;
    accommodationCost: number;
    foodCost: number;
    transportationCost: number;
    visitTime: number;
}

interface DailyItinerary {
    day: number;
    destinations: Destination[];
}

const TravelPlanner: React.FC = () => {
    const { destinations, getDataDestinations, isLoading } = useModel('Dulich');
    const [selectedId, setSelectedId] = useState<string>();
    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [itinerary, setItinerary] = useState<DailyItinerary[]>([]);

    useEffect(() => {
        getDataDestinations();
    }, []);

    const addDestination = () => {
        if (!selectedId) return;
        const found = destinations.find(d => d.id === selectedId);
        if (!found) return;

        setItinerary(prev => {
            const dayIndex = prev.findIndex(d => d.day === selectedDay);
            if (dayIndex > -1) {
                const exists = prev[dayIndex].destinations.some(d => d.id === found.id);
                if (exists) {
                    message.warning('Điểm đến đã tồn tại trong ngày này!');
                    return prev;
                }
                const updated = [...prev];
                updated[dayIndex].destinations.push(found);
                return updated;
            } else {
                return [...prev, { day: selectedDay, destinations: [found] }];
            }
        });
    };

    const removeDestination = (day: number, id: string) => {
        setItinerary(prev =>
            prev.map(d =>
                d.day === day
                    ? { ...d, destinations: d.destinations.filter(dest => dest.id !== id) }
                    : d
            )
        );
    };

    const calculateCost = (list: Destination[]) =>
        list.reduce((sum, d) => sum + d.price + d.accommodationCost + d.foodCost + d.transportationCost, 0);

    const calculateTime = (list: Destination[]) =>
        list.reduce((sum, d) => sum + d.visitTime, 0) + Math.max(list.length - 1, 0);

    return (
        <div>
            <h1>Lịch trình du lịch của bạn</h1>

            <div style={{ marginBottom: 20 }}>
                <Select
                    placeholder="Chọn điểm đến"
                    onChange={setSelectedId}
                    style={{ width: 200, marginRight: 10 }}
                    loading={isLoading}
                >
                    {destinations.map(d => (
                        <Option key={d.id} value={d.id}>{d.name}</Option>
                    ))}
                </Select>

                <Input
                    type="number"
                    min={1}
                    value={selectedDay}
                    onChange={e => setSelectedDay(Number(e.target.value))}
                    placeholder="Ngày"
                    style={{ width: 100, marginRight: 10 }}
                />

                <Button type="primary" onClick={addDestination}>
                    Thêm vào lịch trình
                </Button>
            </div>

            {itinerary
                .sort((a, b) => a.day - b.day)
                .map(day => (
                    <div key={day.day} style={{ marginBottom: 32 }}>
                        <h2>🗓️ Ngày {day.day}</h2>
                        <Row gutter={[16, 16]}>
                            {day.destinations.map(dest => (
                                <Col span={8} key={dest.id}>
                                    <Card
                                        title={dest.name}
                                        cover={<img src={dest.image} alt={dest.name} />}
                                        actions={[
                                            <Button danger onClick={() => removeDestination(day.day, dest.id)}>Xóa</Button>,
                                        ]}
                                    >
                                        <p>Chi phí: {calculateCost([dest])} VND</p>
                                        <p>Thời gian tham quan: {dest.visitTime} giờ</p>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <div style={{ marginTop: 12 }}>
                            <strong>Tổng chi phí:</strong> {calculateCost(day.destinations)} VND<br />
                            <strong>Tổng thời gian:</strong> {calculateTime(day.destinations)} giờ
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default TravelPlanner;
