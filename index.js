const contactService = require("./contacts");
const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "listContacts":
      const allContacts = await contactService.listContacts();
      return console.log(allContacts);
    case "getContactById":
      const oneContact = await contactService.getContactById(id);
      return console.log(oneContact);
    case "addContact":
      const newContact = await contactService.addContact({name, email, phone});
      return console.log(newContact);
    case "removeContactById":
      const removeContact = await contactService.removeContactById(id);
      return console.log(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>")
  .option("-p,--phone <type>")
  .option("-e,--email <type>")
  .option("-n,--name <type>")
  .option("-i,--id <type>");

program.parse();

const options = program.opts();

invokeAction(options);
