import React, { useState } from 'react';
import { Card, Radio, Input, Button, message, Space } from 'antd';
import AudioButton from './audio';

const ExerciseCard = ({ exercise, onSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!answer) {
      message.warning('Please provide an answer');
      return;
    }
    onSubmit(exercise._id, answer);
    setIsSubmitted(true);
  };

  const renderExerciseContent = () => {
    switch (exercise.type) {
      case 'multiple-choice':
        return (
          <Radio.Group onChange={(e) => setAnswer(e.target.value)} value={answer}>
            <Space direction="vertical">
              {exercise.options.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        );

      case 'fill-in-the-blank':
        return (
          <Input
            placeholder="Type your answer here"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        );

      case 'translate':
        return (
          <Input.TextArea
            placeholder="Type your translation here"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
          />
        );

      case 'match':
        return (
          <div>
            {/* Implement matching exercise UI */}
            <p>Match the items on the left with their corresponding items on the right</p>
            {/* Add matching exercise implementation */}
          </div>
        );

      default:
        return <p>Unsupported exercise type</p>;
    }
  };

  return (
    <Card
      title={`Exercise: ${exercise.type}`}
      style={{ marginBottom: '16px' }}
    >
      <div style={{ marginBottom: '16px' }}>
        <p>{exercise.question}</p>
        {exercise.audioUrl && <AudioButton audioUrl={exercise.audioUrl} />}
        {exercise.imageUrl && (
          <img
            src={exercise.imageUrl}
            alt="Exercise"
            style={{ maxWidth: '100%', marginBottom: '16px' }}
          />
        )}
      </div>

      {renderExerciseContent()}

      <div style={{ marginTop: '16px' }}>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={isSubmitted}
        >
          Submit Answer
        </Button>
      </div>
    </Card>
  );
};

export default ExerciseCard; 