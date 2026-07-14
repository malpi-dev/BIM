import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountsScreen } from '../screens/AccountsScreen';
import { AccountDetail } from '../screens/AccountDetail';
import { Account } from '../models/Account';

// Tipos de las rutas y sus parámetros
export type RootStackParamList = {
  Accounts: undefined;
  AccountDetail: { account: Account };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Accounts"
          component={AccountsScreen}
          options={{ title: 'Mis Cuentas' }}
        />
        <Stack.Screen
          name="AccountDetail"
          component={AccountDetail}
          options={{ title: 'Detalle de Cuenta' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
