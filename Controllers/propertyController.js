const Property = require("../Models/propertyModel");

exports.getAll = async (req,res) => {
    try{
        let Houses = await Property.find({});
        res.status(200).json({data:Houses});

    } 
    catch(e){
        res.status(400).json({message:e.message})

    }
}

exports.getOne = async (req,res) => {
    try{
        let Houses = await Property.findById(req.params.id);
        res.status(200).json({data:Houses});

    } 
    catch(e){
        res.status(400).json({message:e.message})

    }
}

exports.create = async (req,res) => {
    try {
        await Property.create(req.body)
        res.status(200).json({message:"House for rent created successfully"})

    } catch(e){
        res.status(400).json({message:e.message})
    }
}

exports.delete = async (req,res) => {
    try {
        await Property.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Deletion successfully"})

    } catch(e){
        res.status(400).json({message:"Error Deletion"})
    }
}

exports.edit = async (req,res) => {
    try {
        await Property.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({message:"Edit successfully"})

    } catch(e){
        res.status(400).json({message:"Error Deletion"})
    }
}