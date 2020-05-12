import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';
import Barra from './components/ui/Barra';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774f2',
    accent: '#0655bf',
  },
};
const App = () => {
  return (
    <>
    <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"  
            screenOptions={{
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: theme.colors.primary
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}
          >
            <Stack.Screen 
              name="Inicio"
              component={Inicio}
              options= { ({navigation, route}) => ({
                /*headerRight: (props) => <Barra {...props} 
                navigation={navigation}
                route = {route}
                />,*/
                title: 'Home'
              })}
            />
            
            <Stack.Screen 
              name="NuevoCliente"
              component={NuevoCliente}
              options={ ({route}) => ({
                title: route.params.cliente ? `Edit ${route.params.cliente.nombre}` : "New"
              }) }
            />
            
            <Stack.Screen 
              name="DetallesCliente"
              component={DetallesCliente}
              options={ ({route}) => ({
                title: route.params.item.nombre
              }) }
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
});

export default App;
