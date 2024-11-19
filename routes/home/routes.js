import express from "express"
import homePage from "../../controllers/home/controller.js";

const homeRoute = express.Router();

homeRoute
.get('/', homePage);

export default homeRoute;