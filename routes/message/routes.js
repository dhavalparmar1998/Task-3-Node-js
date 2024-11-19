import express from "express";

import {addMsgActionPage , addMsgPage} from "../../controllers/message/controller.js";

const msgRoute = express.Router()

msgRoute
.get("/", addMsgPage)
.post("/", addMsgActionPage )

export default msgRoute;