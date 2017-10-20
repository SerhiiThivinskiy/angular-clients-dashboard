import { combineReducers } from 'redux';
import { AppState } from '../app.state';
import { clientsReducer } from './clients.reducer';

export const rootReducer = combineReducers<AppState>({
  clients: clientsReducer
});
