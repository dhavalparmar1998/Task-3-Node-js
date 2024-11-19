import express from "express";
import mongoose from "mongoose";
import {  emptyValidation } from "../../middlewares/validation.js";
import groupModel from "../../models/group/model.js";
import { render } from "ejs";

const addGroupPage = async function(req, res){
    try{
        const grp = await groupModel.find()
        // const libraries = await libraryModel.find()
        res.render('group/addGroupPage', { grp});
    }
    catch(err){
        console.log(err)
    }

    // res.render("group/addGroupPage")
}

const showGroupPage = async function(req,res){
    var {groupName} = req.body;
    var msg = '';
    if(emptyValidation(groupName)){
        msg = "Group Name Is Required"
    }
    else{
        var result = await groupModel.find({groupName : groupName})
        if(result.length > 0 ){
            msg = 'Group Name is Already Exist'
            return res.render("group/addGroupPage", { message: msg });
        }
        else{
            const groupinstance = new groupModel();
            groupinstance.groupName = groupName;
            var resultAfterInsert =  await groupinstance.save();
            console.log(resultAfterInsert);
            msg = 'Group Name Is Inserted'
            // res.redirect('/group/showGrp');
        }
    }
    res.send({message:msg});
}

const showGroupPageWithTable = async function(req, res) {
    try {
        // Fetch all groups from the database
        const grp = await groupModel.find();
        
        // Pass the groups to the template
        res.render('group/showGroupPage', { grp });
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while fetching groups");
    }
}

export{
    addGroupPage,
    showGroupPage,
    showGroupPageWithTable
}