import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { Context } from "../data/Context";
export default function DisplayLabel({ labelIds }) {
  const { labels } = useContext(Context);

  const labelNames = labelIds.map((id) => {
    const label = labels.find((label) => label.id === id);
    return label ? label.name : "";
  });

  return (
    <FlatList
      data={labelNames}
      keyExtractor={(item) => item}
      numColumns={3}
      renderItem={({ item }) => (
        <View
          style={{
            backgroundColor: "lightblue",
            padding: 5,
            borderRadius: 5,
            marginRight: 5,
            maxWidth: 170,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            {item}
          </Text>
        </View>
      )}
    />
  );
}
