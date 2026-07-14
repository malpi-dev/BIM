import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountCard } from '../components/AccountCard';
import { useAccounts } from '../hooks/useAccounts';
import { Account } from '../models/Account';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Accounts'>;

export const AccountsScreen = ({ navigation }: Props) => {
  const { accounts, loading, error, refreshing, refresh } = useAccounts();

  const handlePress = (account: Account) => {
    navigation.navigate('AccountDetail', { account });
  };

  // 1) Indicador de carga
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0a7d34" />
        <Text style={styles.info}>Cargando cuentas...</Text>
      </View>
    );
  }

  // 2) Manejo de errores
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={refresh}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3) Lista con Pull To Refresh
  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={accounts}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <AccountCard account={item} onPress={handlePress} />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
      ListEmptyComponent={
        <Text style={styles.info}>No hay cuentas disponibles.</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  info: {
    marginTop: 12,
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
  error: {
    fontSize: 15,
    color: '#c0392b',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryBtn: {
    backgroundColor: '#0a7d34',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
});
