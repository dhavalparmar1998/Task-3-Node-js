import mongoose from "mongoose";

const Schema = mongoose.Schema;

const librarySchema = new Schema({
    libraryName : String
})

const libraryModel = mongoose.model('libraries', librarySchema);

export default libraryModel;