import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export default function HomeScreen({ navigation }: { navigation: NativeStackNavigationProp<any> }) {
  const signOut = async () => {
    ReactNativeHapticFeedback.trigger("notificationWarning", { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
    try {
      await auth().signOut();
      Alert.alert('Success', 'Logged out successfully!');
      navigation.replace('Auth');
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'An error occurred');
    }
  };

  return (
    <View style={{ padding: 20 }} accessible={true} accessibilityLabel="HomeScreen">
      <Text>Welcome to the AI Shopping Assistant! 🎉</Text>
      <Button title="AI Recommendations" onPress={() => navigation.navigate('AIRecommendations')} />
      <Button title="Search Products" onPress={() => navigation.navigate('ProductSearch')} />
      <Button title="View Shopping List" onPress={() => navigation.navigate('ShoppingList')} />
      <Button title="View Web" onPress={() => navigation.navigate('WebView')} />
      <Button title="Formik Example" onPress={() => navigation.navigate('FormikEx')} />
      <Button title="Sign Out" onPress={signOut} color="red" />
    </View>
  );
}