import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContactInterface } from '../Components/Contact/Interface';

interface ContactState {
    contacts: ContactInterface[];
  }

// the local storage
const initialState : ContactState = {
    contacts: [],
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {

    addContact: ( state : ContactState, action : PayloadAction<ContactInterface>) => {
        state.contacts = [...state.contacts, action.payload];
    },
    updateContact: ( state : ContactState, action : PayloadAction<ContactInterface>) => {
      const index = state.contacts.findIndex((contact) => contact.id === action.payload.id);

      if (index === -1) {
        return 
      }
      const newContacts = [...state.contacts];
      newContacts.splice(index, 1, action.payload);

      state.contacts = newContacts;
  },
    removeContact: ( state : ContactState, action : PayloadAction<string>) => {        
        state.contacts = state.contacts.filter((contactStore) => contactStore.id !== action.payload);
    },
    removeContacts: ( state : ContactState ) => {
        state.contacts = [];
    },
    storeAllContacts: ( state : ContactState, action : PayloadAction<ContactInterface[]>) => {
      state.contacts = action.payload;
    }
  },
});

export const { addContact, updateContact, removeContact, removeContacts, storeAllContacts } = contactSlice.actions;
export default contactSlice.reducer;