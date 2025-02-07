import React, { useState } from 'react';
import { View, Button, Text, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';


const OPENAI_API_KEY = Config.API_KEY;

export default function AIRecommendation() {
  const [recommendation, setRecommendation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getRecommendation = async () => {
    setLoading(true);
    try {
      // Send request to OpenAI's API
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',  // You can switch to 'gpt-3.5-turbo' if needed
          messages: [
            { role: 'system', content: 'You are an assistant that helps suggest products.' },
            { role: 'user', content: 'Suggest best car to drift ' }
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          }
        }
      );

      // Get content from the response
      const content = response.data.choices[0]?.message?.content || '';
      setRecommendation(content);  // Set recommendation to display
    } catch (error: any) {
      Alert.alert('Error fetching recommendations', error?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Get AI Shopping Recommendation" onPress={getRecommendation} />
      
      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      
      {/* Recommendation Text */}
      {recommendation ? <Text style={{ marginTop: 20 }}>{recommendation}</Text> : null}
    </View>
  );
}
