import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { formatDistanceToNow, format } from "date-fns";
import DisplayLabel from "./DisplayLabel";
export default function DisplayItem({ item }) {
  const timeDisplay = (time) => {
    const updatedAt = new Date(time);
    const now = new Date();

    // Check if updatedAt and now are on the same day
    const isSameDay =
      updatedAt.getDate() === now.getDate() &&
      updatedAt.getMonth() === now.getMonth() &&
      updatedAt.getFullYear() === now.getFullYear();

    const displayText = isSameDay
      ? formatDistanceToNow(updatedAt, { addSuffix: true })
      : format(updatedAt, "dd MMMM yyyy HH:mm");
    return displayText;
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        {item.color && (
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: item.color,
              borderRadius: 10,
              marginRight: 10,
            }}
          />
        )}
        <Text
          style={{
            flex: 1,
            fontSize: 16,
          }}
        >
          {timeDisplay(item.updateAt)}
        </Text>
        {item.isBookmarked && <Ionicons name="bookmark" size={20} color="gold" />}
      </View>
      <DisplayLabel labelIds={item.labelIds} />
      <Text
        style={{
          fontSize: 16,
          lineHeight: 24,
          marginTop: 5,
        }}
      >
        {item.content}
      </Text>
    </View>
  );
}
