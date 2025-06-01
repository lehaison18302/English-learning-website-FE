import React from 'react';
import { Card, Typography, List } from 'antd';
import AudioButton from './audio';
import apiEndpoints from '../apis/endPoint';

const { Title, Text } = Typography;

const VocabularyCard = ({ vocabulary }) => {
  return (
    <Card style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Title level={4}>{vocabulary.word}</Title>
          <Text type="secondary">Pronunciation: {vocabulary.pronunciation}</Text>
        </div>
        <AudioButton audioUrl={apiEndpoints.getVocabularyAudio(vocabulary.word)} />
      </div>

      <div style={{ marginTop: '16px' }}>
        <Text strong>Meaning:</Text>
        <p>{vocabulary.meaning}</p>
      </div>

      {vocabulary.examples && vocabulary.examples.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <Text strong>Examples:</Text>
          <List
            size="small"
            dataSource={vocabulary.examples}
            renderItem={(example) => (
              <List.Item>
                <Text>{example}</Text>
              </List.Item>
            )}
          />
        </div>
      )}
    </Card>
  );
};

export default VocabularyCard; 