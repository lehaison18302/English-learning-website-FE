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
  const [lessonExercises, setLessonExercises] = useState([]);
  const [lessonLoading, setLessonLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const response = await apiCommon.getAllLessons();
      console.log('API Response:', response); // Debug log
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setLessons(response.data.data);
      } else {
        console.error('Invalid response format:', response);
        message.error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error fetching lessons:', error);
      message.error('Failed to fetch lessons. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLessonClick = async (lessonId) => {
    try {
      setLessonLoading(true);
      const response = await apiCommon.getLessonContent(lessonId);
      console.log('Lesson content response:', response); // Debug log
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setSelectedLesson(lessons.find(lesson => lesson._id === lessonId));
        setLessonExercises(response.data.data);
      } else {
        message.error('Invalid lesson data received');
      }
    } catch (error) {
      console.error('Error fetching lesson content:', error);
      message.error('Failed to load lesson content. Please try again.');
    } finally {
      setLessonLoading(false);
    }
  };

  const handleExerciseSubmit = async (exerciseId, answer) => {
    try {
      const response = await apiCommon.submitExerciseAnswer(
        selectedLesson._id,
        exerciseId,
        answer
      );
      if (response.data && response.data.success) {
        message.success('Answer submitted successfully!');
      } else {
        message.error(response.data?.message || 'Incorrect answer. Try again!');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      message.error('Failed to submit answer. Please try again.');
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                          <span>Reward: {lesson.reward} points</span>
                          <span>{lesson.isUnlock ? 'Unlocked' : 'Locked'}</span>
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
                  onClick={() => {
                    setSelectedLesson(null);
                    setLessonExercises([]);
                  }}
                  style={{ marginBottom: '16px' }}
                >
                  ← Back to Lessons
                </Button>
                
                {lessonLoading ? (
                  <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Spin size="large" />
                  </div>
                ) : (
                  <div>
                    <Title level={3} style={{ marginBottom: '24px' }}>{selectedLesson.title}</Title>
                    <div style={{ marginBottom: '16px' }}>
                      <span>Reward: {selectedLesson.reward} points</span>
                    </div>
                    
                    {lessonExercises && lessonExercises.length > 0 ? (
                      lessonExercises.map((exercise) => (
                        <ExerciseCard
                          key={exercise._id}
                          exercise={exercise}
                          onSubmit={handleExerciseSubmit}
                        />
                      ))
                    ) : (
                      <div style={{ textAlign: 'center', padding: '20px' }}>
                        <p>No exercises available for this lesson</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
