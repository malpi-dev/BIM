import { useState, useEffect, useCallback } from 'react';
import { Account } from '../models/Account';
import { getAccounts } from '../services/accountService';

interface UseAccountsResult {
  accounts: Account[];
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  refresh: () => void;
}

export function useAccounts(): UseAccountsResult {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const data = await getAccounts();
      setAccounts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Carga inicial al montar la pantalla
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // Se dispara con el Pull To Refresh
  const refresh = useCallback(() => {
    fetchAccounts(true);
  }, [fetchAccounts]);

  return { accounts, loading, error, refreshing, refresh };
}
