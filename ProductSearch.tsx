import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

const API_KEY = Config.API_KEY;

export default function ProductSearch() {
  const [query, setQuery] = useState('');
  const [responseLines, setResponseLines] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const searchProduct = async () => {
    if (!query.trim()) {
      Alert.alert('Error', 'Please enter a valid query.');
      return;
    }

    setLoading(true);
    setResponseLines([]);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are an assistant that returns raw text responses.' },
            { role: 'user', content: query },
          ],
          max_tokens: 350,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          }
        }
      );

      const responseText = response.data.choices[0]?.message?.content || '';
      const lines = responseText.split('\n').filter(line => line.trim() !== '');
      setResponseLines(lines);
    } catch (error: any) {
      console.error('Error:', error?.response?.data || error);
      Alert.alert(
        'Error',
        error?.response?.data?.error?.message || 'An error occurred while fetching the response.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder='Enter your prompt...'
        placeholderTextColor='#999'
      />
      <Button
        title='Search'
        onPress={searchProduct}
        disabled={loading || !query.trim()}
      />
      {loading && <ActivityIndicator size='large' color='#0000ff' style={styles.loader} />}
      <FlatList
        data={responseLines}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.responseLine}>{item}</Text>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No results to display.</Text>}
      />
    </View>
  );
}

// Keep the same styles as before
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  loader: {
    marginVertical: 16,
  },
  responseLine: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 16,
  },
});