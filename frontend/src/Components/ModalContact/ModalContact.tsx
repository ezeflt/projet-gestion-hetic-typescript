import React, { useState } from "react";
import { Modal } from "antd";
import { ACTION, ModalInterface } from "./ModalInterface";
import { useDispatch } from "react-redux";
import { addContact, updateContact } from "../../redux/contact";
import { Alert } from "antd";
import { ResponseContactApi } from "../Interface";

enum STATUS {
  SUCCESS = "success",
  FAILED = "failed",
}

interface ToastAlert {
  alert: STATUS;
  message: string;
}

const ModalContact = (props: ModalInterface) => {
  const { handleClose, open, id } = props;

  const usernameValue = props.contactData ? props.contactData.username : '';
  const emailValue = props.contactData ? props.contactData.email : '';
  const phoneNumberValue = props.contactData ? props.contactData.phoneNumber : '';

  const [username, setUsername] = React.useState<string>(usernameValue);
  const [email, setEmail] = React.useState<string>(emailValue);
  const [phoneNumber, setPhoneNumber] = React.useState<string>(phoneNumberValue);
  const [toastAlert, setToastAlert] = useState<ToastAlert>({
    alert: STATUS.FAILED,
    message: "",
  });
  const dispatch = useDispatch();

  const clearContactData = () => {
    setUsername("");
    setEmail("");
    setPhoneNumber("");
  };

  const handleCloseModal = () => {
    handleClose();
  };

  const displayToastAlert = (alert: STATUS, message: string) => {
    setToastAlert({ alert, message });
    setTimeout(() => {
      setToastAlert({ alert, message: "" });
    }, 2000);
  };

  const checkDataEmptyOrShort = (): {
    id?: string;
    username: string;
    email: string;
    phoneNumber: string;
  } | void => {
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );

    if (username.length < 2) {
      displayToastAlert(STATUS.FAILED, "X the username is not fill");
      return;
    }
    if (!emailRegex.test(email)) {
      displayToastAlert(STATUS.FAILED, "X the email is not valid");
      return;
    }
    if (phoneNumber.length < 10) {
      displayToastAlert(STATUS.FAILED, "X the phone is not fill");
      return;
    }

    return { id, username, email, phoneNumber };
  };

  const handleAddContact = async () => {
    const contactData = checkDataEmptyOrShort();

    if (!contactData) {
      return;
    }
    const method = props.action === ACTION.ADD ? "POST" : "PUT";
    
    try {
      fetch("http://localhost:3450/contact", {
        method: method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(contactData),
      })
        .then((response) => response.json())
        .then((contactResponse: ResponseContactApi) => {
          if (!contactResponse.response) {
            return;
          }
          
          switch (props.action) {
            case ACTION.ADD:
              clearContactData();
              dispatch(addContact(contactResponse.contact));
              return

            case ACTION.PUT:
              dispatch(updateContact(contactResponse.contact));
              return
          }
        });
    } catch (error) {
      console.error(error);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <>
      <Modal
        onCancel={handleCloseModal}
        onOk={handleAddContact}
        open={open}
        okText="Valide contact"
        cancelText="Cancel"
        className="modal"
      >
        {toastAlert.message && (
          <Alert
            style={{
              color: toastAlert.alert === STATUS.SUCCESS ? "green" : "red",
            }}
            message={toastAlert.message}
            type={toastAlert.alert === STATUS.SUCCESS ? "success" : "error"}
            className="alert"
          />
        )}
        <form action="">
          <label>user name</label>
          <input
            placeholder="username..."
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label>user email</label>
          <input
            placeholder="exemple123@gmail.com"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>phone number</label>
          <input
            placeholder="07 50 49 04 29"
            type="number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
        </form>
      </Modal>
    </>
  );
};

export default ModalContact;
