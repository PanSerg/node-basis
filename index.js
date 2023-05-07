const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const contactService = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "listContacts":
      const allContacts = await contactService.listContacts();
      return console.log(allContacts);
    case "getContactById":
      const oneContact = await contactService.getContactById(id);
      return console.log(oneContact);
    case "addContact":
      const newContact = await contactService.addContact(name, email, phone);
      return console.log(newContact);
    case "removeContactById":
      const removeContact = await contactService.removeContactById(id);
      return console.log(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const arr = hideBin(process.argv);

const { argv } = yargs(arr);
invokeAction(argv);
