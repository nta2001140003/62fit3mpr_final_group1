import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text } from "react-native";
export default function Drawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          margin: 10,
          color: "blue",
        }}
      >
        Note App
      </Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
