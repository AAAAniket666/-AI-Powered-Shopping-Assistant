import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./Auth";
import HomeScreen from "./HomeScreen";
import AIRecommendation from "./AIRecommendation";
import ProductSearch from "./ProductSearch";
import ShoppingList from "./ShoppingList";
import WebView from "./WebView";
import FormikEx from './FormikEx';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ title: "Login" }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Dashboard" }} />
        <Stack.Screen name="AIRecommendations" component={AIRecommendation} options={{ title: "AI Recommendations" }} />
        <Stack.Screen name="ProductSearch" component={ProductSearch} options={{ title: "Product Search" }} />
        <Stack.Screen name="ShoppingList" component={ShoppingList} options={{ title: "Shopping List" }} />
        <Stack.Screen name="WebView" component={WebView} options={{ title: "Web View" }} />
        <Stack.Screen name="FormikEx" component={FormikEx} options={{ title: "Formik Example" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}