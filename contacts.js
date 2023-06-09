const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(`${__dirname}`, "db", "contacts.json");

const updateContacts = async (contacts) =>
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


const listContacts = async() => {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

const getContactById = async(id) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
}

const removeContactById = async(id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(result);
    return result;
}

const addContact = async(name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
};
