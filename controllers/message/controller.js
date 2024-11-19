
import msgModel from "../../models/message/model.js";
import { emptyValidation } from "../../middlewares/validation.js";
import libraryModel from "../../models/library/model.js";

const addMsgPage = async function(req,res){
    try {
        const library = await libraryModel.find();
        
        res.render('message/addMessagePage', { library });
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while fetching groups");
    }
    // res.render('message/addMessagePage');
}

const addMsgActionPage = async function(req,res){
    var{ addMessage, selectLirary} = req.body
    // var record = {...req.body}
    var msg = '';
   if(emptyValidation(addMessage)){
     msg = "Message is Required"
   }
   else{
    const msginstance = new msgModel();
    msginstance.selectLirary = selectLirary;
    msginstance.addMessage = addMessage;
    var resultAfterInsert = await msginstance.save();
    console.log(resultAfterInsert);
    msg = "Message Inserted"
   }
   res.send({message:msg});
}

export{
    addMsgPage,
    addMsgActionPage
}