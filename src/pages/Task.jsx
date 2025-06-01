import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { Card, Typography, Tag, Row, Col } from "antd";
import { TrophyOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function Task() {
    const [completedLessons, setCompletedLessons] = useState([]);

    useEffect(() => {
        // Load completed lessons from localStorage
        const storedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
        setCompletedLessons(storedLessons);
    }, []);

    return (
        <div style={styles.container}>
            <Sidebar />
            <div style={styles.content}>
                <Title level={2} style={styles.title}>Completed Lessons</Title>
                <Row gutter={[24, 24]}>
                    {completedLessons.map((lesson) => (
                        <Col xs={24} sm={12} md={8} key={lesson.id}>
                            <Card
                                hoverable
                                style={styles.lessonCard}
                            >
                                <Title level={4} style={styles.lessonTitle}>
                                    {lesson.title}
                                </Title>
                                
                                <div style={styles.statsContainer}>
                                    <div style={styles.statItem}>
                                        <TrophyOutlined style={styles.icon} />
                                        <div>
                                            <Text type="secondary">Score</Text>
                                            <div>
                                                <Text strong>{lesson.score}</Text>
                                                <Text type="secondary">/{lesson.totalExercises}</Text>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div style={styles.statItem}>
                                        <ClockCircleOutlined style={styles.icon} />
                                        <div>
                                            <Text type="secondary">Time</Text>
                                            <div>
                                                <Text strong>{lesson.completionTime}</Text>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={styles.completionInfo}>
                                    <Tag color="success">Completed</Tag>
                                    <Text type="secondary">on {lesson.completedAt}</Text>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        minHeight: "100vh",
    },
    content: {
        flex: 1,
        padding: "24px",
        marginLeft: "240px",
        backgroundColor: "#f5f7fa",
    },
    title: {
        marginBottom: "24px",
        color: "#1a1a1a",
    },
    lessonCard: {
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    },
    lessonTitle: {
        marginBottom: "16px",
        color: "#1a1a1a",
    },
    statsContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "16px",
    },
    statItem: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    icon: {
        fontSize: "20px",
        color: "#1890ff",
    },
    completionInfo: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "16px",
        paddingTop: "16px",
        borderTop: "1px solid #f0f0f0",
    },
};

export default Task;