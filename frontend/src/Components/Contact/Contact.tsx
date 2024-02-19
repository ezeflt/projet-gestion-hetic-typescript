import React from "react";
import { ContactInterface } from "./Interface";
import ModalContact from "../ModalContact/ModalContact";
import { useDispatch } from "react-redux";
import { removeContact } from "../../redux/contact";
import { ResponseContactApi } from "../Interface";
import { ACTION } from "../ModalContact/ModalInterface";

const Contact = ({ id, username, email, phoneNumber }: ContactInterface) => {
  const contactData: ContactInterface = { id, username, email, phoneNumber };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const deleteContact = () => {
    fetch(`http://localhost:3001/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((contactResponse: ResponseContactApi) => {
        if (!contactResponse.response) {
          return;
        }

        dispatch(removeContact(id));
      });
  };

  return (
    <>
      <ModalContact
        id={id}
        action={ACTION.PUT}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        contactData={contactData}
      />
      <div className="contact">
        <span>{username.slice(0, 30)}</span>
        <span>{email.slice(0, 30)}</span>
        <span>{phoneNumber.slice(0, 10)}</span>
        <div className="btn">
          <button className="update" onClick={handleOpen}>
            update
          </button>
          <button className="delete" onClick={deleteContact}>
            delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Contact;
