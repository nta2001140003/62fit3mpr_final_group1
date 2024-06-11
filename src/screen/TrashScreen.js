import React, { useContext, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Context } from "../data/Context";
import DisplayItem from "../component/DisplayItem";
import Dialog from "react-native-dialog";
export default function TrashScreen() {
  const context = useContext(Context);
  const { trash } = context;
  const [noteID, setNoteID] = useState("");
  const [dialog, setDialog] = useState(false);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 15,
        }}
      >
        <Text>
          {trash.length} {trash.length >= 1 ? "notes" : "note"} in trash
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            marginLeft: "auto",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "red",
          }}
          onPress={() => context.emptyTrash()}
        >
          <Text
            style={{
              color: "white",
              padding: 10,
              fontWeight: "bold",
            }}
          >
            Empty trash
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            marginLeft: 10,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "green",
          }}
          onPress={() => {
            trash.forEach((item) => {
              context.restoreNote(item.id);
            });
          }}
        >
          <Text
            style={{
              color: "white",
              padding: 10,
              fontWeight: "bold",
            }}
          >
            Restore all
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={trash}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                padding: 10,
                marginVertical: 10,
                backgroundColor: "white",
                marginHorizontal: 10,
                elevation: 5,
                borderRadius: 10,
              }}
              onPress={() => {
                setDialog(true);
                setNoteID(item.id);
              }}
            >
              <DisplayItem item={item} />
            </TouchableOpacity>
          );
        }}
      />
      <Dialog.Container visible={dialog}>
        <View style={{ justifyContent: "space-between" }}>
          <Dialog.Button label="Restore" onPress={() => {
            context.restoreNote(noteID);
            setDialog(false);
          }} />
          <Dialog.Button
            label="Delete"
            onPress={() => {
              context.deleteNote(noteID);
              setDialog(false);
            }}
            style={{ color: "red" }}
          />
        </View>
      </Dialog.Container>
    </View>
  );
}
