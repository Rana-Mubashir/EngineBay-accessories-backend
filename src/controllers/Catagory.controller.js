import { Catagory } from "../models/Catagory.models.js";

async function createCatagory(req, res) {
    try {
        const { name, imageUrl } = req.body

        if (!name || !imageUrl) {
            return res.status(400).json({
                message: 'Empty fields!'
            })
        }

        const createdCatagory = await Catagory.create({
            name,
            imageUrl
        })

        if (!createdCatagory) {
            return res.status(500).json({
                message: 'Something went wrong while creating the catagory'
            })
        }

        return res.status(201).json({
            message: 'Catagory created sucessfully',
            createdCatagory
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        })
    }
}


async function updateCatagory(req, res) {
    try {

        const { name, imageUrl } = req.body
        const catagoryId = req.params.id

        if (!name || !imageUrl || !catagoryId) {
            return res.status(400).json({
                message: 'Data required',
            })
        }

        const updatedCatagory = await Catagory.findByIdAndUpdate(catagoryId, {
            name,
            imageUrl,
        }, { new: true })

        if (!updatedCatagory) {
            return res.status(404).json({
                message: 'Catagory not found',
            })
        }

        return res.status(200).json({
            message: 'Catagory updated sucessfully',
            updatedCatagory,
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error,
        })
    }
}

async function deleteCatagory(req, res) {
    try {
        const catagoryId = req.params.id
        if (!catagoryId) {
            return res.status(400).json({
                message: 'Id required',
            })
        }

        const deleteCatagory = await Catagory.findByIdAndDelete(catagoryId);
        if (!deleteCatagory) {
            return res.status(404).json({
                message: 'catagory not found',
            })
        }

        return res.status(200).json({
            message: 'Catagory deleted ',
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
}

async function getAllCatagory(req,res) {
    try {
        const allCatagory = await Catagory.find()

        if (allCatagory.length === 0) {
            return res.status(404).json({
                message: 'No Catagory found'
            })
        }
        return res.status(200).json({
            message: 'Catagories found',
            allCatagory
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: 'Internal server error'
        })
    }
}

export { createCatagory,updateCatagory,deleteCatagory,getAllCatagory }

