import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Account } from '../models/Account';
import { formatCurrency } from '../utils/currency';

interface AccountCardProps {
  account: Account;
  onPress: (account: Account) => void;
}

export const AccountCard = ({ account, onPress }: AccountCardProps) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => onPress(account)}
    >
      <View style={styles.header}>
        <Text style={styles.type}>{account.type}</Text>
        <Text style={styles.balance}>{formatCurrency(account.balance)}</Text>
      </View>
      <Text style={styles.number}>N° {account.number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  type: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  balance: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a7d34',
  },
  number: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
});
