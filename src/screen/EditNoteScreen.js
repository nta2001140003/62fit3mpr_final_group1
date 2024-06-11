import React, {
  useContext,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Context } from "../data/Context";
import DisplayLabel from "../component/DisplayLabel";
import { formatDistanceToNow, format } from "date-fns";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";

export default function EditNoteScreen({ navigation, route }) {
  const { item } = route.params;
  const context = useContext(Context);

  const { notes, colors } = context;
  const editNote = notes.find((note) => note.id === item);
  const [content, setContent] = useState(editNote.content);

  const snapPoints = useMemo(() => ["50%", "80%"], []);
  const bottomSheetRef = useRef(null);

  const BottomSheetBackdropComponent = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

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
  const handleUpdateNote = () => {
    if (content.trim() === "") {
      alert("Content can't be empty!");
      return;
    } else if (content === editNote.content) {
      alert("Content is the same!");
      return;
    } else {
      context.editNote(editNote.id, {
        ...editNote,
        content,
        updateAt: new Date().toISOString(),
      });
    }
  };

  const handleToggleBookmark = () => {
    context.editNote(editNote.id, {
      ...editNote,
      isBookmarked: !editNote.isBookmarked,
    });
  };
  const handleColorChange = (color) => {
    if (color === editNote.color) {
      return;
    }
    context.editNote(editNote.id, {
      ...editNote,
      color,
      updateAt: new Date().toISOString(),
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          margin: 10,
          backgroundColor: "white",
        }}
      >
        <DisplayLabel labelIds={editNote.labelIds} />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <TextInput
          style={{
            fontSize: 16,
            lineHeight: 24,
            margin: 10,
            borderWidth: 1,
            padding: 10,
            borderColor: "gray",
            borderRadius: 10,
          }}
          value={content}
          onChangeText={setContent}
          placeholder="Update your note here..."
        />
        <TouchableOpacity
          style={{
            margin: 10,
            padding: 10,
            backgroundColor: "lightblue",
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={handleUpdateNote}
        >
          <Text>Update Note Content</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopWidth: 1,
          borderColor: "lightgray",
          backgroundColor: "lightgray",
        }}
      >
        <Text
          style={{
            margin: 10,
            fontSize: 16,
          }}
        >
          Updated: {timeDisplay(editNote.updateAt)}
        </Text>
        <TouchableOpacity onPress={handleToggleBookmark}>
          <Ionicons
            name={editNote.isBookmarked ? "bookmark" : "bookmark-outline"}
            size={25}
            color="blue"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={() => bottomSheetRef.current?.expand()}
        >
          <Ionicons name="ellipsis-vertical-outline" size={25} color="red" />
        </TouchableOpacity>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdropComponent}
        enablePanDownToClose={true}
        enableDismissOnClose={false}
        style={{
          padding: 10,
        }}
      >
        <View
          style={{
            marginBottom: 10,
          }}
        >
          <FlatList
            data={colors}
            keyExtractor={(item) => item}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleColorChange(item)}>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: item,
                    marginHorizontal: 5,
                    borderRadius: 5,
                  }}
                >
                  {item === null && (
                    <Ionicons
                      name="ban-outline"
                      size={32}
                      color="#ababab"
                      style={{ position: "absolute" }}
                    />
                  )}
                  {item === editNote.color && (
                    <Ionicons name="checkmark" size={30} color="black" />
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View>
          <DisplayLabel labelIds={editNote.labelIds} />
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: "lightblue",
              borderRadius: 5,
              alignItems: "center",
              marginVertical: 10,
            }}
            onPress={() => {
              bottomSheetRef.current?.close();
              navigation.navigate("ManageLabels", { noteId: editNote.id });
            }}
          >
            <Text>+ Add Label</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: "lightcoral",
              borderRadius: 5,
              alignItems: "center",
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={() => {
              context.moveToTrash(editNote.id);
              navigation.goBack();
            }}
          >
            <Ionicons name="trash-outline" size={20} color="black" />
            <Text>Move to Trash</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}
