import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import ExerciseCard from "../components/ExerciseCard";
import VocabularyCard from "../components/VocabularyCard";
import { Card, Row, Col, Typography, Spin, message, Tabs, Button } from "antd";
import apiCommon from "../apis/functionApi";

const { Title } = Typography;
const { TabPane } = Tabs;

function Home() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await apiCommon.getAllLessons();
      console.log('API Response:', response);
      console.log('Lessons data:', response.data);
      setLessons(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      message.error('Failed to fetch lessons');
      setLoading(false);
    }
  };

  const handleLessonClick = async (lessonId) => {
    try {
      setLoading(true);
      const response = await apiCommon.getLessonContent(lessonId);
      setSelectedLesson(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch lesson content');
      setLoading(false);
    }
  };

  const handleExerciseSubmit = async (exerciseId, answer) => {
    try {
      const response = await apiCommon.submitExerciseAnswer(
        selectedLesson._id,
        exerciseId,
        answer
      );
      if (response.success) {
        message.success('Answer submitted successfully!');
      } else {
        message.error('Incorrect answer. Try again!');
      }
    } catch (error) {
      message.error('Failed to submit answer');
    }
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div style={{ marginLeft: '240px', padding: '20px' }}>
        <Title level={2} style={{ marginBottom: '24px' }}>English Learning Lessons</Title>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            {!selectedLesson ? (
              <Row gutter={[16, 16]}>
                {lessons && lessons.length > 0 ? (
                  lessons.map((lesson) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={lesson._id}>
                      <Card
                        hoverable
                        onClick={() => handleLessonClick(lesson._id)}
                        style={{ height: '100%' }}
                      >
                        <Title level={4}>{lesson.title}</Title>
                        <p>{lesson.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>Level: {lesson.level}</span>
                          <span>{lesson.duration} min</span>
                        </div>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col span={24}>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <p>No lessons available</p>
                    </div>
                  </Col>
                )}
              </Row>
            ) : (
              <div>
                <Button 
                  type="link" 
                  onClick={() => setSelectedLesson(null)}
                  style={{ marginBottom: '16px' }}
                >
                  ← Back to Lessons
                </Button>
                
                <Tabs defaultActiveKey="vocabulary">
                  <TabPane tab="Vocabulary" key="vocabulary">
                    {selectedLesson.vocabulary.map((vocab) => (
                      <VocabularyCard key={vocab._id} vocabulary={vocab} />
                    ))}
                  </TabPane>
                  
                  <TabPane tab="Exercises" key="exercises">
                    {selectedLesson.exercises.map((exercise) => (
                      <ExerciseCard
                        key={exercise._id}
                        exercise={exercise}
                        onSubmit={handleExerciseSubmit}
                      />
                    ))}
                  </TabPane>
                </Tabs>
              </div>
            )}
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default Home;
