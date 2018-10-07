import { AddressSource } from 'modules/addresses/types';
import KeyIcon from 'static/images/key.svg';
import LedgerIcon from 'static/images/ledger.svg';
import TrezorIcon from 'static/images/trezor.svg';
import KeepKeyIcon from 'static/images/keepkey.svg';
import MetamaskIcon from 'static/images/metamask.svg';
import EyeIcon from 'static/images/eye.svg';
import OtherIcon from 'static/images/other.svg';

interface SourceUI {
  label: string;
  color: string;
  icon: any;
}

export const SOURCE_UI: { [key in AddressSource]: SourceUI } = {
  [AddressSource.PRIVATE_KEY]: {
    label: 'Private key',
    color: '#CCC',
    icon: KeyIcon,
  },
  [AddressSource.LEDGER]: {
    label: 'Ledger',
    color: '#333',
    icon: LedgerIcon,
  },
  [AddressSource.TREZOR]: {
    label: 'TREZOR',
    color: '#000',
    icon: TrezorIcon,
  },
  [AddressSource.KEEPKEY]: {
    label: 'KeepKey',
    color: '#c8d900',
    icon: KeepKeyIcon,
  },
  [AddressSource.METAMASK]: {
    label: 'MetaMask',
    color: '#F79220',
    icon: MetamaskIcon,
  },
  [AddressSource.VIEW_ONLY]: {
    label: 'View-only',
    color: '#7f8c8d',
    icon: EyeIcon,
  },
  [AddressSource.OTHER]: {
    label: 'Other',
    color: '#9b59b6',
    icon: OtherIcon,
  }
};