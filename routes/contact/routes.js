import express from "express"
import { contactActionPage, contactPage, getContactDetails } from "../../controllers/contact/controller.js";

const contactRoute = express.Router();

contactRoute
.get("/", contactPage)
.post("/", contactActionPage)
.get('/:contactId', getContactDetails);


export default contactRoute;