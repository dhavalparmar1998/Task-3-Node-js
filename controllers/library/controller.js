// import express from "express"

import { emptyValidation } from "../../middlewares/validation.js";
import libraryModel from "../../models/library/model.js";

const addLibraryPage = async function (req, res) {
    const { libraryName } = req.query;

    if (libraryName) {
        const library = await libraryModel.findOne({ libraryName });

        if (library) {
            return res.render('library/addLibraryPage', { libraryName: library.libraryName });
        }
    }

    return res.render('library/addLibraryPage');
};

const showLibraryPage = async function(req, res){
    console.log(req.body)
    var {libraryName } = req.body;
    var msg = ''
    
    if(emptyValidation(libraryName)){
        msg = 'LibraryName is required';
        return res.render('library/addLibraryPage');
    }
    else{
        var resultFromId = await libraryModel.find({libraryName : libraryName});
        if(resultFromId.length > 0){
            msg = 'This Library Is Already Exist'
            return res.render('library/addLibraryPage', {message:msg})
        }
        else{
            const libraryInstance = new libraryModel();
            libraryInstance.libraryName = libraryName;
            var resultAfterInsert = await libraryInstance.save()
            console.log(resultAfterInsert);
            msg = 'Library Inserted' 

        }
        return res.json({ message: msg }); 
    }
    return res.render('library/showLibraryPage');
}


const showLibraryPageWithTable =async function(req, res){
    const libraries = await libraryModel.find();
    res.render('library/showLibraryPage', {libraries})
}

const updateLibrary = async function (req, res) {
    const { oldLibraryName, newLibraryName } = req.body;

    if (!oldLibraryName || !newLibraryName) {
        return res.status(400).send({ message: 'Both old and new library names are required' });
    }

    // Update library name in the database
    const result = await libraryModel.findOneAndUpdate(
        { libraryName: oldLibraryName },
        { libraryName: newLibraryName },
        { new: true }
    );

    if (result) {
        return res.json({ message: 'Library updated successfully' });
    }

    return res.status(404).json({ message: 'Library not found' });
};

const deleteLibrary = async function (req, res) {
    const { libraryName } = req.body;

    if (!libraryName) {
        return res.status(400).json({ message: 'Library name is required' });
    }

    // Delete the library from the MongoDB database
    const result = await libraryModel.findOneAndDelete({ libraryName });

    if (result) {
        return res.json({ message: 'Library deleted successfully' });
    }

    return res.status(404).json({ message: 'Library not found' });
};


export{
    addLibraryPage,
    showLibraryPage,
    showLibraryPageWithTable,
    deleteLibrary,
    updateLibrary
}