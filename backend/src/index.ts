import express, { Request, Response } from "express";
import cors from "cors";

interface Contact {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
}

const app = express();
app.use(cors());
app.use(express.json());

const port = 3450;

let ContactDataBase: Contact[] = [];

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/**
 * get all contact from ContactDataBase
 */
app.get("/", (req: Request, res: Response) => {
  res.send({ response: true, contacts: ContactDataBase });
});

/**
 * Add a contact to ContactDataBase
 */
app.post("/contact", (req: Request, res: Response) => {
  const contactRequest: Contact = req.body as unknown as Contact;

  if (!contactRequest) {
    res.json({ response: false, message: "The contact is empty" });
    return;
  }
  const id = Math.random().toString();
  ContactDataBase.push({ ...contactRequest, id: id });

  const newContact = ContactDataBase.find((contact) => contact.id === id);

  res.json({ response: true, contact: newContact });
});

/**
 * Delete a contact by ID
 */
app.delete("/:id", (req: Request, res: Response) => {
  const index = req.params.id as unknown as number;

  if (!index) {
    res.json({ response: false, message: "The query has not an index" });
    return;
  }

  ContactDataBase.splice(index, 1);

  res.json({ response: true, contact: ContactDataBase });
});

/**
 * Update a contact
 */
app.put("/contact", (req: Request, res: Response) => {
  const contactUpdate: Contact = req.body as unknown as Contact;
  
  if (!contactUpdate) {
    res.json({ response: false, message: "The contact is empty" });
    return;
  }

  const index = ContactDataBase.findIndex(
    (contact) => contact.email === contactUpdate.email
  );

  if (index === -1) {
    res.json({ response: false, message: "The index is not found" });
    return;
  }

  ContactDataBase.splice(index, 1, contactUpdate);

  const contactUpdated = ContactDataBase.find((contact) => contact.id === contactUpdate.id );

  res.json({ response: true, contact: contactUpdated });
});
