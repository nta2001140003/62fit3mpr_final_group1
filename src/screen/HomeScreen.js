import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Context } from "../data/Context";
import DisplayItem from "../component/DisplayItem";

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const { notes } = useContext(Context);
  const [filteredNotes, setFilteredNotes] = useState([]);
  useEffect(() => {
    if (search.length === 0) {
      setFilteredNotes(
        notes.sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt))
      );
      return;
    }
    setFilteredNotes(
      notes
        .filter((note) =>
          note.content.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt))
    );
  }, [search, notes]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 15,
            marginBottom: 10,
            marginTop: 45,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Ionicons name="menu" size={25} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 30,
              fontWeight: "bold",
            }}
          >
            Home
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "lightblue",
          borderRadius: 10,
          margin: 10,
        }}
      >
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          style={{
            flex: 1,
            fontSize: 16,
          }}
        />
        {search.length > 0 ? (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close" size={20} color="gray" />
          </TouchableOpacity>
        ) : (
          <Ionicons name="search" size={20} color="gray" />
        )}
      </View>

      {search.length === 0 ? (
        <Text style={styles.text}>
          {filteredNotes.length === 0
            ? "Please add a note"
            : `${filteredNotes.length} ${
                filteredNotes.length > 1 ? "notes" : "note"
              }`}
        </Text>
      ) : (
        <Text
          style={[
            styles.text,
            { color: filteredNotes.length === 0 ? "red" : "blue" },
          ]}
        >
          {filteredNotes.length === 0
            ? "Not Found!"
            : `Found ${filteredNotes.length} ${
                filteredNotes.length === 1 ? "note" : "notes"
              } match with "${search}"`}
        </Text>
      )}

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
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
              navigation.navigate("EditNote", { item: item.id });
            }}
          >
            <DisplayItem item={item} />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
        }}
        onPress={() => {
          navigation.navigate("NewNote");
        }}
      >
        <Ionicons name="add-circle" size={50} color={"blue"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: "blue",
  },
});
