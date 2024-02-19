import { ContactInterface } from "./Contact/Interface";

export interface ResponseContactApi {
    response: boolean;
    contact: ContactInterface;
  }

  export interface ResponseContactsApi {
    response: boolean;
    contacts: ContactInterface[];
  }