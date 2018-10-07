import { AES, enc } from 'crypto-js';
import { selectAddresses } from 'modules/addresses/selectors';
import { setAddresses } from 'modules/addresses/actions';
import {
  selectSyncedCryptoState,
  selectSalt,
  selectPassword,
} from 'modules/crypto/selectors';
import { setSyncedCryptoState } from 'modules/crypto/actions';
import { AppState } from 'store/reducers';
import cryptoTypes from 'modules/crypto/types';

export const TEST_CIPHER_DATA = 'Howdy partner!';

export function encryptData(data: any, password: string, salt: string) {
  return AES.encrypt(JSON.stringify(data), password + salt).toString();
}

export function decryptData(cipher: any, password: string, salt: string) {
  const decrypted = AES.decrypt(cipher, password + salt);
  return JSON.parse(decrypted.toString(enc.Utf8));
}

export interface SyncConfig<T> {
  key: string;
  encrypted: boolean;
  triggerActions: string[];
  selector(state: AppState): T;
  action(
    payload: T,
  ): {
    type: string;
    payload: T;
  };
}
export const syncConfigs: Array<SyncConfig<any>> = [
  {
    key: 'crypto',
    encrypted: false,
    selector: selectSyncedCryptoState,
    action: setSyncedCryptoState,
    // TODO: Add triggers for when they reset account, import account
    triggerActions: [cryptoTypes.SET_PASSWORD],
  },
  {
    key: 'addresses',
    encrypted: true,
    selector: selectAddresses,
    action: setAddresses,
    // TODO: Add triggers for when they add, remove addresses
    triggerActions: [],
  },
];

export function generateBackupData(state: AppState) {
  // Get things needed for encryption
  const salt = selectSalt(state);
  const password = selectPassword(state);

  return syncConfigs.reduce((a: any, sc) => {
    let data = sc.selector(state);
    if (sc.encrypted && password && salt) {
      data = encryptData(data, password, salt);
    }
    a[sc.key] = data;
    return a;
  }, {});
}
