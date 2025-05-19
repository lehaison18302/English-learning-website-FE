import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import ExerciseCard from "../components/ExerciseCard";
import VocabularyCard from "../components/VocabularyCard";
import { Card, Row, Col, Typography, Spin, message, Tabs, Button, Tag, Progress, Result } from "antd";
import { LockOutlined, UnlockOutlined, TrophyOutlined, ArrowLeftOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import apiCommon from "../apis/functionApi";
import { auth } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

function Home() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonExercises, setLessonExercises] = useState([]);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [completedExercises, setCompletedExercises] = useState({});
  const [lessonScore, setLessonScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const response = await apiCommon.getAllLessons();
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
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setSelectedLesson(lessons.find(lesson => lesson._id === lessonId));
        setLessonExercises(response.data.data);
        setCompletedExercises({});
        setLessonScore(0);
        setStartTime(new Date());
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

  const handleExerciseSubmit = (exerciseId, answer) => {
    const exercise = lessonExercises.find(ex => ex._id === exerciseId);
    if (!exercise) return;

    const isCorrect = answer.toLowerCase() === exercise.correctAnswer.toLowerCase();
    
    // Update completed exercises
    setCompletedExercises(prev => ({
      ...prev,
      [exerciseId]: {
        isCorrect,
        userAnswer: answer
      }
    }));

    // Update score
    if (isCorrect) {
      setLessonScore(prev => prev + 1);
      message.success('Correct answer! 🎉');
    } else {
      message.error('Incorrect answer. Try again!');
    }
  };

  const calculateProgress = () => {
    const totalExercises = lessonExercises.length;
    const completedCount = Object.keys(completedExercises).length;
    return Math.round((completedCount / totalExercises) * 100);
  };

  const isLessonCompleted = () => {
    return Object.keys(completedExercises).length === lessonExercises.length;
  };

  const calculateCompletionTime = () => {
    if (!startTime) return "0 minutes";
    const endTime = new Date();
    const diffInMinutes = Math.round((endTime - startTime) / (1000 * 60));
    return `${diffInMinutes} minutes`;
  };

  const handleLessonCompletion = async () => {
    if (!selectedLesson) return;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');

      const completedLesson = {
        userId: user.uid,
        lessonId: selectedLesson._id,
        title: selectedLesson.title,
        score: lessonScore,
        totalExercises: lessonExercises.length,
        completionTime: calculateCompletionTime(),
        completedAt: new Date()
      };

      // Save to Firestore
      const db = getFirestore();
      await addDoc(collection(db, 'completedLessons'), completedLesson);

      // Reset lesson state
      setSelectedLesson(null);
      setLessonExercises([]);
      setCompletedExercises({});
      setLessonScore(0);
      setStartTime(null);

      message.success('Lesson completed successfully! 🎉');
    } catch (error) {
      console.error('Error saving completed lesson:', error);
      message.error('Failed to save lesson completion. Please try again.');
    }
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div style={{ marginLeft: '240px', padding: '20px', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
        <Title level={2} style={{ marginBottom: '24px', color: '#1a1a1a' }}>English Learning Journey</Title>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            {!selectedLesson ? (
              <Row gutter={[24, 24]}>
                {lessons && lessons.length > 0 ? (
                  lessons.map((lesson) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={lesson._id}>
                      <Card
                        hoverable
                        onClick={() => handleLessonClick(lesson._id)}
                        style={{
                          height: '100%',
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                          transition: 'all 0.3s ease',
                          border: 'none',
                          background: lesson.isUnlock ? 'white' : '#f5f5f5'
                        }}
                        bodyStyle={{ padding: '20px' }}
                      >
                        <div style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          height: '100%',
                          opacity: lesson.isUnlock ? 1 : 0.7
                        }}>
                          <Title level={4} style={{ 
                            color: lesson.isUnlock ? '#1a1a1a' : '#8c8c8c',
                            marginBottom: '16px'
                          }}>
                            {lesson.title}
                          </Title>
                          
                          <div style={{ marginTop: 'auto' }}>
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              marginBottom: '12px'
                            }}>
                              <Tag 
                                icon={<TrophyOutlined />} 
                                color="gold"
                                style={{ 
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontSize: '14px'
                                }}
                              >
                                {lesson.reward} points
                              </Tag>
                              {lesson.isUnlock ? (
                                <Tag 
                                  icon={<UnlockOutlined />} 
                                  color="success"
                                  style={{ 
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                  }}
                                >
                                  Unlocked
                                </Tag>
                              ) : (
                                <Tag 
                                  icon={<LockOutlined />} 
                                  color="default"
                                  style={{ 
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                  }}
                                >
                                  Locked
                                </Tag>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col span={24}>
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <Text type="secondary">No lessons available at the moment</Text>
                    </div>
                  </Col>
                )}
              </Row>
            ) : (
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Button 
                  type="link" 
                  onClick={() => {
                    setSelectedLesson(null);
                    setLessonExercises([]);
                    setCompletedExercises({});
                    setLessonScore(0);
                  }}
                  style={{ 
                    marginBottom: '24px',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <ArrowLeftOutlined /> Back to Lessons
                </Button>
                
                {lessonLoading ? (
                  <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Spin size="large" />
                  </div>
                ) : (
                  <div style={{ 
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}>
                    <Title level={3} style={{ 
                      marginBottom: '16px',
                      color: '#1a1a1a'
                    }}>
                      {selectedLesson.title}
                    </Title>
                    
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginBottom: '24px',
                      padding: '12px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px'
                    }}>
                      <Tag 
                        icon={<TrophyOutlined />} 
                        color="gold"
                        style={{ 
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      >
                        {selectedLesson.reward} points
                      </Tag>
                      <Text type="secondary">Complete all exercises to earn points</Text>
                    </div>

                    {isLessonCompleted() ? (
                      <Result
                        status="success"
                        title="Congratulations! 🎉"
                        subTitle={`You completed the lesson with ${lessonScore} correct answers out of ${lessonExercises.length} exercises!`}
                        extra={[
                          <Button 
                            type="primary" 
                            key="back"
                            onClick={handleLessonCompletion}
                          >
                            Back to Lessons
                          </Button>
                        ]}
                      />
                    ) : (
                      <>
                        <div style={{ marginBottom: '24px' }}>
                          <Progress 
                            percent={calculateProgress()} 
                            status="active"
                            format={percent => `${percent}% Complete`}
                          />
                          <div style={{ 
                            marginTop: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <Text type="secondary">
                              {Object.keys(completedExercises).length} of {lessonExercises.length} exercises completed
                            </Text>
                            <Text strong>
                              Score: {lessonScore}/{lessonExercises.length}
                            </Text>
                          </div>
                        </div>
                        
                        {lessonExercises && lessonExercises.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {lessonExercises.map((exercise) => (
                              <ExerciseCard
                                key={exercise._id}
                                exercise={exercise}
                                onSubmit={handleExerciseSubmit}
                                isCompleted={!!completedExercises[exercise._id]}
                                isCorrect={completedExercises[exercise._id]?.isCorrect}
                                userAnswer={completedExercises[exercise._id]?.userAnswer}
                                correctAnswer={exercise.correctAnswer}
                              />
                            ))}
                          </div>
                        ) : (
                          <div style={{ 
                            textAlign: 'center', 
                            padding: '40px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px'
                          }}>
                            <Text type="secondary">No exercises available for this lesson</Text>
                          </div>
                        )}
                      </>
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
