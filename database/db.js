import mongoose from "mongoose";

async function dbconnect(){
    await mongoose.connect('mongodb+srv://admin:admin@cluster20.veja3.mongodb.net/SMS'
    //     , {
    //     useNewUrlParser: true,
    // useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 60000 
    //     })
)}

export default dbconnect