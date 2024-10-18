import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Estoque from './src/screens/Estoque';
import Usuarios from './src/screens/Usuarios';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Estoque"
          component={Estoque}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Usuarios"
          component={Usuarios}
          options={{ headerShown: false }}
        />



      </Stack.Navigator>

    </NavigationContainer>
  );
}

