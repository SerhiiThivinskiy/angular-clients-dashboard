import { Client } from '../models/client';

const initialState = [];

export function clientsReducer(state: Array<Client> = initialState, action: any) {
  switch (action.type) {
    case 'UPDATE_CLIENTS':
      console.log('UPDATE_CLIENTS ', action.payload.clients);
      return action.payload.clients;
    default:
      return state;
  }
}
