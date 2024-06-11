import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "./src/data/Context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Drawer from "./src/component/Drawer";
import HomeScreen from "./src/screen/HomeScreen";
import EditNoteScreen from "./src/screen/EditNoteScreen";
import ManageLabelsScreen from "./src/screen/ManageLabelsScreen";
import NewNoteScreen from "./src/screen/NewNoteScreen";
import LabelsScreen from "./src/screen/LabelsScreen";
import TrashScreen from "./src/screen/TrashScreen";

const stack = createNativeStackNavigator();
const drawer = createDrawerNavigator();

function Stack() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <stack.Screen name="EditNote" component={EditNoteScreen} />
      <stack.Screen name="NewNote" component={NewNoteScreen} />
      <stack.Screen name="ManageLabels" component={ManageLabelsScreen} />
    </stack.Navigator>
  );
}
export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <drawer.Navigator drawerContent={(props) => <Drawer {...props} />}>
          <drawer.Screen
            name="Home"
            component={Stack}
            options={{ headerShown: false }}
          />
          <drawer.Screen name="Labels" component={LabelsScreen} />
          <drawer.Screen name="Trash" component={TrashScreen} />
        </drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
