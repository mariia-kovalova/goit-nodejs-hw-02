const { readFile, writeFile } = require('fs/promises');
const { join } = require('path');
const { nanoid } = require('nanoid');

const contactsPath = join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);
  return contact || null;
};

const addContact = async data => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) return null;
  const [removedContact] = contacts.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
