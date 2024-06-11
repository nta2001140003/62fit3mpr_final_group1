import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Context } from "../data/Context";
import Dialog from "react-native-dialog";
export default function LabelsScreen() {
  const context = useContext(Context);
  const { labels } = context;
  const [search, setSearch] = useState("");
  const [filteredLabels, setFilteredLabels] = useState([]);

  const [dialog, setDialog] = useState(false);
  const [editLabel, setEditLabel] = useState("");
  const [updateLabel, setUpdateLabel] = useState("");

  useEffect(() => {
    if (search.length === 0) {
      setFilteredLabels(labels);
      return;
    }
    setFilteredLabels(
      labels.filter((label) =>
        label.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, labels]);
  const renderLabelMessage = () => {
    if (search.length === 0) {
      if (filteredLabels.length === 0) {
        return <Text style={styles.noLabelsText}>Please add a label</Text>;
      } else {
        return (
          <Text style={styles.labelCountText}>
            {filteredLabels.length}{" "}
            {filteredLabels.length > 1 ? "labels" : "label"}
          </Text>
        );
      }
    } else {
      if (filteredLabels.length === 0) {
        return <Text style={styles.noLabelsText}>No labels found</Text>;
      } else {
        return (
          <Text style={styles.labelCountText}>
            Found {filteredLabels.length}{" "}
            {filteredLabels.length > 1 ? "labels" : "label"} matching "{search}"
          </Text>
        );
      }
    }
  };
  return (
    <View>
      <TextInput
        placeholder="Search labels"
        style={{ padding: 10, margin: 10, borderColor: "gray", borderWidth: 1 }}
        value={search}
        onChangeText={setSearch}
      />
      {renderLabelMessage()}
      {search.length > 0 && (
        <TouchableOpacity
          style={{ backgroundColor: "lightblue", padding: 10, margin: 10 }}
          onPress={() => {
            context.addLabel(search);
            setSearch("");
          }}
        >
          <Text style={{ marginLeft: 10, color: "blue", textAlign: "center" }}>
            Add label "{search}"
          </Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={filteredLabels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              borderBottomColor: "gray",
              margin: 5,
              borderRadius: 5,
              backgroundColor: "lightblue",
              elevation: 5,
            }}
            onPress={() => {
              setUpdateLabel(item.id);
              setEditLabel(item.name);
              setDialog(true);
            }}
          >
            <Text
              style={{
                margin: 10,
                flex: 1,
                fontSize: 16,
                textAlign: "center",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Dialog.Container visible={dialog}>
        <Dialog.Input
          placeholder="Update label here..."
          value={editLabel}
          onChangeText={setEditLabel}
        />
        <Dialog.Button
          label="Remove"
          onPress={() => {
            context.deleteLabel(updateLabel);
            setDialog(false);
            setEditLabel("");
          }}
          style={{ color: "red" }}
        />
        <Dialog.Button
          label="Update"
          onPress={() => {
            if (editLabel === "") {
              return;
            }
            context.editLabel(updateLabel, { name: editLabel });
            setDialog(false);
            setEditLabel("");
          }}
        />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  noLabelsText: {
    textAlign: "center",
    margin: 10,
    fontSize: 16,
    color: "red",
  },
  labelCountText: {
    marginLeft: 10,
    fontSize: 16,
    color: "blue",
  },
});
