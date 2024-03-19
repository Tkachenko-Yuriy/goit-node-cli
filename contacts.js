const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const list = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(list);
}

async function getContactById(contactId) {
  const list = await listContacts();
  const contactWithId = list.find((item) => item.id === contactId);
  return contactWithId || null;
}

async function removeContact(contactId) {
  const list = await listContacts();
  const index = list.findIndex((item) => item.id === contactId);
  if (index !== -1) {
    const [removedContact] = list.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return removedContact;
  }
  return null;
}

async function addContact(name, email, phone) {
  const list = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };

  list.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
