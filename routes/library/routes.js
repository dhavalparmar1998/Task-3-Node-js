import express from "express"
import { showLibraryPage, addLibraryPage, showLibraryPageWithTable, deleteLibrary, updateLibrary } from "../../controllers/library/controller.js";

const libraryRoute = express.Router()

libraryRoute
.get('/addLib', addLibraryPage)
.post('/showLib', showLibraryPage)
.get('/showLib', showLibraryPageWithTable)
.post('/deleteLibrary', deleteLibrary)
.post('/updateLibrary', updateLibrary)


export default libraryRoute;