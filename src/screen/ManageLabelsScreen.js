import React, { useContext, useState, useEffect } from "react";
import { Context } from "../data/Context";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function ManageLabelsScreen({ route }) {
  const context = useContext(Context);
  const { labels, notes, editNote } = context;

  const { noteId } = route.params;
  const [note, setNote] = useState(
    notes.find((note) => note.id === noteId) || {}
  );
  const [search, setSearch] = useState("");
  const [filteredLabels, setFilteredLabels] = useState(labels);

  useEffect(() => {
    if (search.length === 0) {
      setFilteredLabels(labels);
    } else {
      setFilteredLabels(
        labels.filter((label) =>
          label.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, labels]);

  const handleLabelToggle = (labelId) => {
    const updatedLabelIds = note.labelIds.includes(labelId)
      ? note.labelIds.filter((id) => id !== labelId)
      : [...note.labelIds, labelId];

    const updatedNote = {
      ...note,
      labelIds: updatedLabelIds,
      updatedAt: new Date().toISOString(),
    };

    setNote(updatedNote);
    editNote(note.id, updatedNote);
  };

  if (!note || !note.labelIds) {
    return (
      <View>
        <Text>Note not found</Text>
      </View>
    );
  }

  return (
    <View>
      <TextInput
        placeholder="Search labels"
        value={search}
        onChangeText={setSearch}
        style={{
          padding: 5,
          borderColor: "gray",
          borderWidth: 1,
          margin: 5,
          borderRadius: 5,
          fontSize: 16,
        }}
      />
      <Text
        style={{
          padding: 5,
          margin: 5,
          fontSize: 16,
          color: "blue",
        }}
      >
        {labels.length} total{" "}
        {note.labelIds.length === 0
          ? "No labels"
          : note.labelIds.length === 1
          ? "1 label"
          : `${note.labelIds.length} labels`}{" "}
        selected
      </Text>
      <FlatList
        data={filteredLabels}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: note.labelIds.includes(item.id)
                ? "lightblue"
                : "lightgrey",
              padding: 5,
              borderRadius: 5,
              margin: 5,
              maxWidth: 100,
            }}
            onPress={() => handleLabelToggle(item.id)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
