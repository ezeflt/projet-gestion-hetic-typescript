import React, { useEffect } from "react";
import "./App.css";
import Contact from "../Components/Contact/Contact";
import ModalContact from "../Components/ModalContact/ModalContact";
import { useDispatch, useSelector } from "react-redux";
import { ContactInterface } from "../Components/Contact/Interface";
import { ACTION } from "../Components/ModalContact/ModalInterface";
import { storeAllContacts } from "../redux/contact";
import { ResponseContactsApi } from "../Components/Interface";

function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const contacts: ContactInterface[] = useSelector((state: any)=>state.contact.contacts);
  const dispatch = useDispatch();

  useEffect(()=>{
    fetch("http://localhost:3001")
      .then(response => response.json())
      .then((responseContacts: ResponseContactsApi) => {
        if (!responseContacts.response){
          return
        }

        dispatch(storeAllContacts(responseContacts.contacts));
      });
    
  },[])
  return (
    <div className="page">
      <h1>Contact gestion</h1>
      <button 
        className="btn_add" 
        onClick={handleOpen}
      >
        Add a contact
      </button>
      <div className="contact_container">
        {contacts?.map((contact: ContactInterface) => <Contact {...contact}/> )}
      </div>
      <ModalContact 
        action={ACTION.ADD}
        handleOpen={handleOpen} 
        handleClose={handleClose} 
        open={open} 
      />
    </div>
  );
}

export default App;
