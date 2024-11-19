import mongoose from "mongoose";

const Schema = mongoose.Schema;

const msgSchema = new Schema({
    addMessage : String,
    selectLirary : String
})

const msgModel  = mongoose.model('messages', msgSchema);

export default msgModel;