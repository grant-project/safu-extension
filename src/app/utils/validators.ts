import { validateMnemonic } from 'bip39';
import { toChecksumAddress, isValidPrivate } from 'ethereumjs-util';

export function isValidEthAddress(addr: string): boolean {
  if (addr === '0x0000000000000000000000000000000000000000') {
    return false;
  }
  if (addr.substring(0, 2) !== '0x') {
    return false;
  } else if (!/^(0x)?[0-9a-f]{40}$/i.test(addr)) {
    return false;
  } else if (/^(0x)?[0-9a-f]{40}$/.test(addr) || /^(0x)?[0-9A-F]{40}$/.test(addr)) {
    return true;
  } else {
    return addr === toChecksumAddress(addr);
  }
}

export function isValidMnemonic(mnemonic: string) {
  return validateMnemonic(mnemonic);
}

export function isValidPrivateKey(pkey: string) {
  const strippedKey = pkey.replace('0x', '');
  if (strippedKey.length === 64) {
    const keyBuffer = Buffer.from(strippedKey, 'hex');
    return isValidPrivate(keyBuffer);
  }
}