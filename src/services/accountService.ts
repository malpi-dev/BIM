import { Account } from '../models/Account';
const BASE_URL = 'https://banco-bim.com';
// const BASE_URL = 'http://10.0.2.2:3000';

export async function getAccounts(): Promise<Account[]> {
  console.log('init get accounts: ');
  console.log(`${BASE_URL}/api/accounts`);
  const response = await fetch(`${BASE_URL}/api/accounts`);

  if (!response.ok) {
    console.log(JSON.stringify(response, null, 3));
    throw new Error(
      `No se pudieron obtener las cuentas (código ${response.status}).`,
    );
  }

  const data: Account[] = await response.json();
  return data;
}
