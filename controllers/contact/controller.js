
import { emailValidation, emptyValidation, mobilevalidation } from "../../middlewares/validation.js";
import contactModel from "../../models/contact/model.js";
import groupModel from "../../models/group/model.js";

const contactPage = async function(req, res) {
  try {
    const group = await groupModel.find(); 
    res.render('contact/addContactPage', { group });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while fetching groups");
  }
}

const contactActionPage = async function(req, res) {
  const { selectGroup, contactName, contactPhone, contactEmail } = req.body;
  let msg = '';

  if (emptyValidation(contactName)) {
    msg = "Name is required";
  } else if (mobilevalidation(contactPhone)) {
    msg = 'Please enter a valid phone number';
  } else if (emailValidation(contactEmail)) {
    msg = 'Please enter a valid email address';
  }

  if (msg) {
    const group = await groupModel.find();
    return res.render('contact/addContactPage', { group, msg });
  }

  try {
    const existingContact = await contactModel.findOne({ contactEmail });
    if (existingContact) {
      msg = 'Contact already exists';
      const group = await groupModel.find();
      return res.render('contact/addContactPage', { group, msg });
    }

    const contactInstance = new contactModel();
    contactInstance.selectGroup = selectGroup;
    contactInstance.contactName = contactName;
    contactInstance.contactPhone = contactPhone;
    contactInstance.contactEmail = contactEmail;
    const resultAfterInsert = await contactInstance.save();
    msg = 'Contact Inserted' 

  } catch (error) {
    console.error("Error inserting contact:", error);
    res.status(500).send('Error inserting contact');
  }

  res.send({message:msg})
}

const getContactDetails = async function(req, res) {
  const contactId = req.params.contactId;
  console.log("Fetching details for contact ID:", contactId); // Add this log
  try {
    const contact = await contactModel.findById(contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    console.log("Error:", err); // Updated error log
    res.status(500).json({ message: "An error occurred" });
  }
}

export {
  contactPage,
  contactActionPage,
  getContactDetails
}
