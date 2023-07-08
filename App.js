import { NavigationContainer } from "@react-navigation/native";
import TelaInicial from "./Screens/TelaInicial";
import MetaProgramada from "./Screens/MetaProgramada";
import CriarMeta from "./Screens/CriarMeta";
import Alarme from "./Screens/Alarme";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
import { firebaseConfig } from "./config";
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
else{
  firebase.app()
}


const Stack= createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="TelaInicial">
        <Stack.Screen name= "TelaInicial" component={TelaInicial}></Stack.Screen>
        <Stack.Screen name= "MetaProgramada" component={MetaProgramada}></Stack.Screen>
        <Stack.Screen name= "CriarMeta" component={CriarMeta}></Stack.Screen>
        {/* <Stack.Screen name= "Alarme" component={Alarme}></Stack.Screen> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

