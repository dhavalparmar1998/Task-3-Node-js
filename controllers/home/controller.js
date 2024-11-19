import express from "express";
import libraryModel from "../../models/library/model.js";
import groupModel from "../../models/group/model.js";
import contactModel from "../../models/contact/model.js";
import msgModel from "../../models/message/model.js";

const homePage = async function(req, res){
    // res.render('homePage')

    try{
        const grp = await groupModel.find()
        const msg = await msgModel.find()
        const cont = await contactModel.find()
        const libraries = await libraryModel.find()
        res.render('homePage', {libraries, grp,msg, cont });
    }
    catch(err){
        console.log(err)
    }

}

export default homePage;