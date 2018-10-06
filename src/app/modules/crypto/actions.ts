import types from './types';

export function generateSalt() {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  array = array.map(x => validChars.charCodeAt(x % validChars.length));
  const salt = String.fromCharCode.apply(null, array);

  return {
    type: types.GENERATE_SALT,
    payload: salt,
  };
}

export function setPassword() {
  return { type: types.SET_PASSWORD };
}
