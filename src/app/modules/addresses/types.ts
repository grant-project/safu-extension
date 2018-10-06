enum AddressesTypes {
  SET_ADDRESSES = 'SET_ADDRESSES',
};

export default AddressesTypes;

export interface AddressConfig {
  address: string;
  label: string;
}