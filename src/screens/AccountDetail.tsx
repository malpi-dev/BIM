import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InfoRow } from '../components/InfoRow';
import { formatCurrency } from '../utils/currency';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'AccountDetail'>;

export const AccountDetail = ({ route }: Props) => {
  const { account } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{account.type}</Text>
      <View style={styles.card}>
        <InfoRow label="Número" value={account.number} />
        <InfoRow label="Tipo" value={account.type} />
        <InfoRow label="Saldo" value={formatCurrency(account.balance)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
});
