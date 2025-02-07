import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function AuthScreen({ navigation }: { navigation: NativeStackNavigationProp<any> }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Account created successfully!');
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'An error occurred');
    }
  };

  const signIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Signed in successfully!');
      navigation.navigate('HomeScreen');
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'An error occurred');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text>Password:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={signUp} />
      <Button title="Sign In" onPress={signIn} />
    </View>
  );
} 