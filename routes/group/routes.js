import express from "express"
import { addGroupPage, showGroupPage, showGroupPageWithTable } from "../../controllers/group/controller.js";

const groupRoute = express.Router();

groupRoute
.get('/addGrp', addGroupPage)
.post('/showGrp', showGroupPage)
// .get('/showGrp', showGroupPageWithTable)
.get('/showGrp', showGroupPageWithTable);

export default groupRoute