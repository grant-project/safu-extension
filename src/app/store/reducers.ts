// tslint:disable no-empty-interface
import { combineReducers } from 'redux';

export interface AppState {}

export const combineInitialState: AppState = {
  test: {}
};

export default combineReducers<AppState>({
  test: () => ({}),
});
