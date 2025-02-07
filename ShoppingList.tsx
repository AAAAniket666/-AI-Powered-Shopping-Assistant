import React, { useState } from "react";
import { View, Text, Button, FlatList } from "react-native";

export default function ShoppingList() {
  const [list, setList] = useState<string[]>([]);

  const addItem = (item: string) => {
    setList([...list, item]);
  };

  return (
    <View>
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <Button title="Add Random Item" onPress={() => addItem("New Item")} />
    </View>
  );
}
