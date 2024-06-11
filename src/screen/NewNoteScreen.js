import React, { useContext, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Context } from "../data/Context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function NewNoteScreen({ navigation }) {
  const context = useContext(Context);
  const [content, setContent] = useState("");

  const handleSaveNote = () => {
    if (content.trim().length === 0) {
      return; // Don't save empty notes
    }
    context.addNote({
      content: content.trim(),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type note content here..."
        value={content}
        onChangeText={setContent}
        multiline
        style={styles.textInput}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
        <Ionicons name="checkmark-circle" size={50} color={"blue"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
  },
  textInput: {
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    borderColor: "black",
  },
  saveButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});
