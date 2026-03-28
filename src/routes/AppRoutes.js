import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importando as telas (ajuste o caminho dos pontos '../' para voltar uma pasta)
import HomeScreen from '../screens/HomeScreen';
import ChildMenuScreen from '../screens/menuProfile/ChildMenuScreen';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChildMenu"
        component={ChildMenuScreen}
        options={{ 
          headerShown: false, 
          animation: 'slide_from_right' 
        }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;