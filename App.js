import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicial from './screens/Inicial';
import Cadastro from './screens/Cadastro';
import Login from './screens/Login';
import AreaLogada from './screens/AreaLogada';
import CompletarCadastro from './screens/CompletarCadastro';
import AtualizarAcesso from './screens/AtualizarAcesso';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <SafeAreaView style={estilos.containerSafe}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Inicial'>
          <Stack.Screen
            name='Inicial'
            component={Inicial}
            options={{ headerShown: false }}
            initialParams={{ deslogado: false }}
          />
          <Stack.Screen name='Login' component={Login} options={{
            title: 'Entre com suas credenciais',
            headerStyle: { backgroundColor: 'green' },
            headerTintColor: '#fff',
          }} />
          <Stack.Screen name='Cadastro' component={Cadastro} options={{
            title: 'Cadastre-se para ter acesso',
            headerStyle: { backgroundColor: 'blue' },
            headerTintColor: '#fff',
          }} />
          <Stack.Screen name='AreaLogada' component={AreaLogada} options={{ headerShown: false }} />
          <Stack.Screen name='CompletarCadastro' component={CompletarCadastro} options={{ title: "Completar cadastro" }} />
          <Stack.Screen name='AtualizarAcesso' component={AtualizarAcesso} options={{ title: "Atualizar dados de acesso" }} />
        </Stack.Navigator>

      </NavigationContainer>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  containerSafe: {
    flex: 1
  },
});
