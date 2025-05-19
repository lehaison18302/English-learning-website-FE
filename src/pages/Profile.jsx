import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { Card, Typography, Row, Col, Avatar, Statistic, Progress, List, Tag, Spin } from "antd";
import { UserOutlined, TrophyOutlined, ClockCircleOutlined, BookOutlined } from '@ant-design/icons';
import apiCommon from "../apis/functionApi";

const { Title, Text } = Typography;

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    totalScore: 0,
    averageScore: 0,
    totalTime: 0
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // Fetch user information
      const userResponse = await apiCommon.getUserProfile();
      setUserInfo(userResponse.data.data);

      // Fetch completed lessons
      const lessonsResponse = await apiCommon.getUserCompletedLessons();
      setCompletedLessons(lessonsResponse.data.data);

      // Calculate statistics
      calculateStats(lessonsResponse.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (lessons) => {
    const totalScore = lessons.reduce((sum, lesson) => sum + lesson.score, 0);
    const totalTime = lessons.reduce((sum, lesson) => {
      const minutes = parseInt(lesson.completionTime);
      return sum + (isNaN(minutes) ? 0 : minutes);
    }, 0);

    setStats({
      totalLessons: lessons.length,
      completedLessons: lessons.length,
      totalScore: totalScore,
      averageScore: lessons.length > 0 ? (totalScore / lessons.length).toFixed(1) : 0,
      totalTime: totalTime
    });
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Sidebar />
        <div style={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <Row gutter={[24, 24]}>
          {/* User Profile Section */}
          <Col xs={24} md={8}>
            <Card style={styles.profileCard}>
              <div style={styles.profileHeader}>
                <Avatar 
                  size={100} 
                  icon={<UserOutlined />} 
                  src={userInfo?.avatar}
                  style={styles.avatar}
                />
                <Title level={3} style={styles.userName}>
                  {userInfo?.name || 'User Name'}
                </Title>
                <Text type="secondary">{userInfo?.email}</Text>
              </div>

              <div style={styles.statsSection}>
                <Statistic
                  title="Total Score"
                  value={stats.totalScore}
                  prefix={<TrophyOutlined />}
                />
                <Statistic
                  title="Completed Lessons"
                  value={stats.completedLessons}
                  prefix={<BookOutlined />}
                />
                <Statistic
                  title="Total Learning Time"
                  value={`${stats.totalTime} min`}
                  prefix={<ClockCircleOutlined />}
                />
              </div>
            </Card>
          </Col>

          {/* Learning Progress Section */}
          <Col xs={24} md={16}>
            <Card title="Learning Progress" style={styles.progressCard}>
              <div style={styles.progressSection}>
                <Text strong>Overall Progress</Text>
                <Progress 
                  percent={Math.round((stats.completedLessons / stats.totalLessons) * 100)} 
                  status="active"
                />
                <div style={styles.progressStats}>
                  <Text type="secondary">
                    {stats.completedLessons} of {stats.totalLessons} lessons completed
                  </Text>
                  <Text strong>Average Score: {stats.averageScore}</Text>
                </div>
              </div>

              <div style={styles.lessonsSection}>
                <Title level={4}>Recent Completed Lessons</Title>
                <List
                  dataSource={completedLessons.slice(0, 5)}
                  renderItem={lesson => (
                    <List.Item>
                      <Card style={styles.lessonCard}>
                        <div style={styles.lessonInfo}>
                          <Title level={5}>{lesson.title}</Title>
                          <div style={styles.lessonStats}>
                            <Tag color="blue">Score: {lesson.score}/{lesson.totalExercises}</Tag>
                            <Tag color="green">Time: {lesson.completionTime}</Tag>
                            <Text type="secondary">Completed: {lesson.completedAt}</Text>
                          </div>
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

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
  loadingContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "240px",
  },
  profileCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  profileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "24px",
  },
  avatar: {
    backgroundColor: "#1890ff",
    marginBottom: "16px",
  },
  userName: {
    marginBottom: "8px",
  },
  statsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  progressCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  progressSection: {
    marginBottom: "24px",
  },
  progressStats: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
  },
  lessonsSection: {
    marginTop: "24px",
  },
  lessonCard: {
    width: "100%",
    marginBottom: "8px",
  },
  lessonInfo: {
    width: "100%",
  },
  lessonStats: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
    flexWrap: "wrap",
  },
};

export default Profile;
