import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Estoque from './src/screens/Estoque';
import Usuarios from './src/screens/Usuarios';
import CadastrarUsuario from './src/screens/CadastrarUsuario';
import ListaMovimentacoes from './src/screens/ListaMovimentacoes';
import NovaMovimentacao from './src/screens/NovaMovimentacao';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator

        // voltar pra tela de login depois
        initialRouteName='ListaMovimentacoes'>


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

        <Stack.Screen
          name="CadastrarUsuario"
          component={CadastrarUsuario}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ListaMovimentacoes"
          component={ListaMovimentacoes}
        // options={{ headerShown: false }}
        />

        <Stack.Screen
          name="NovaMovimentacao"
          component={NovaMovimentacao}
          // options={{ headerShown: false }}
        />


      </Stack.Navigator>

    </NavigationContainer>
  );
}

