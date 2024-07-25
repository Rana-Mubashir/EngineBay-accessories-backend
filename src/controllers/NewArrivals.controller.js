import { NewArrivals } from "../models/NewArrivals.models.js";

async function create(req, res) {
    try {
        const { name, description, colors, price, catagory, stock, launch, imagesUrl } = req.body;
        if (!name ||
            !description ||
            !colors ||
            !price ||
            !stock  ||
            !catagory ||
            !imagesUrl
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const newArrival = await NewArrivals.create({
            name, description, colors, price,  stock, launch, catagory,imagesUrl
        });

        if (!newArrival) {
            return res.status(500).json({
                message: 'Something went  wrong while creating newArrival'
            })
        }

        return res.status(201).json({
            message: 'New Arrival created',
            newArrival
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error:error.message
        })
    }
}

async function launchNewArrival(req, res) {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                message: 'Id must be required'
            })
        }

        const isProduct = await NewArrivals.findById(id);
        if (!isProduct) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        const launch = await NewArrivals.findByIdAndUpdate(id, { launch: !isProduct.launch }, {
            new: true
        })
        if (!launch) {
            return res.status(500).json({
                message: 'Something  went wrong while lanuching the product'
            })
        }

        return res.status(200).json({
            message: 'Product lanuch sucessfully',
            launch
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

async function getAllNewArrivals(req, res) {
    try {

        const getAll = await NewArrivals.find({ launch: true })
        if (getAll.length === 0) {
            return res.status(404).json({
                message: 'No new Arrivals found'
            })
        }

        return res.status(200).json({
            message: 'New Arrivals found',
            getAll,
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

async function deleteNewArrival(req, res) {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                message: 'Id must be required'
            })
        }

        const del = await NewArrivals.findByIdAndDelete(id);
        if (!del) {
            return res.status(500).json({
                message: 'Something went wrong while deleting '
            })
        }

        return res.status(200).json({
            message: 'Deleted sucessfully'
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function update(req, res) {
    try {
        const id = req.params.id
        const { name, description, colors, price, catagory, stock, launch, imagesUrl } = req.body;

        if (!name ||
            !description ||
            !colors ||
            !price ||
            !stock ||
            !catagory ||
            !imagesUrl
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const updateProduct = await NewArrivals.findByIdAndUpdate(id, {
            name, description, colors, price, catagory, stock, launch, imagesUrl
        }, { new: true })

        if (!updateProduct) {
            return res.status(404).json({
                message: 'Product not found.'
            })
        }

        return res.status(200).json({
            message: 'Product updated sucessfully.',
            updateProduct
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

export { create, launchNewArrival, deleteNewArrival, getAllNewArrivals, update }