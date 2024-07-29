import { Product } from "../models/Product.models.js";

async function createProduct(req, res) {
    try {

        const { name, description, price, colors, stock, launch, category, subCategory } = req.body
        if (
            !name ||
            !description ||
            !price ||
            !colors ||
            !stock
            // !category ||
            // !subCategory
            // !imageUrl
        ) {
            return res.status(400).json({
                message: 'All fields required'
            })
        }

        const create = await Product.create({
            name, description, price, colors, stock, launch, category, subCategory
        })

        if (!create) {
            return res.status(500).json({
                message: 'Something went wrong while creating product'
            })
        }

        return res.status(201).json({
            message: 'Product created',
            create
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function deleteProduct(req, res) {
    try {

        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                message: 'Id must be required'
            })
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json({
            message: 'Product deleted sucessfully'
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function getAllProducts(req,res) {
    try {
        const findAll = await Product.find({
            launch: true,
            isOffer: false
        })

        if (findAll.length === 0) {
            return res.status(404).json({
                message: 'No product found'
            })
        }

        res.status(200).json({
            message: 'Products found',
            findAll,
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// from here our controllers for offer


async function applyOffer(req, res) {
    try {
        const { offerEndDate, offerPrice } = req.body
        const id = req.params.id

        if (
            !offerEndDate ||
            !offerPrice ||
            !id
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const find = await Product.findById(id);

        if (!find) {
            return res.status(404).json({
                message: 'No product found'
            })
        }

        const createOffer = await Product.findByIdAndUpdate(id, {
            offerPrice, offerEndDate, isOffer: !find.isOffer
        }, { new: true })

        if (!createOffer) {
            return res.status(404).json({
                message: 'Product not found,May be you provided id is wrong'
            })
        }


        return res.status(200).json({
            message: 'Offer applied sucessfully'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function closeOffer(req, res) {
    try {

        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                message: 'Id must be required'
            })
        }

        const findOffer = await Product.findById(id);

        if (!findOffer) {
            return res.status(404).json({
                message: 'Offer not found',
            })
        }

        const closedOffer = await Product.findByIdAndUpdate(id,
            {
                offerEndDate: null,
                offerPrice: 0,
                isOffer: !findOffer.isOffer
            },
            { new: true }
        )

        if (!closedOffer) {
            return res.status(500).json({
                message: 'Something went wrong while closing the offer'
            })
        }

        return res.status(200).json({
            message: 'Offer closed Sucessfully'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

async function updateOffer(req, res) {
    try {

        const id = req.params.id
        const { offerEndDate, offerPrice } = req.body

        if (
            !offerEndDate ||
            !offerPrice ||
            !id
        ) {
            return res.status(400).json({
                message: 'All fields required'
            })
        }

        const offerUpdated = await Product.findByIdAndUpdate(id, {
            offerEndDate,
            offerPrice
        }, { new: true })

        if (!offerUpdated) {
            return res.status(404).json({
                message: "Offer does not found"
            })
        }

        return res.status(200).json({
            message: 'Offer updated sucessfully',
            offerUpdated
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })

    }
}

async function getAllOffers(req, res) {
    try {

        const allOffers = await Product.find({
            launch: true,
            isOffer: true
        })

        if (allOffers.length === 0) {
            return res.status(404).json({
                message: 'No offers found'
            })
        }

        res.status(200).json({
            message: 'Offers found',
            allOffers
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

// from here controllers for newArrivals


async function getAllNewArrivals(req,res) {
    try {

        const find = await Product.find({
            launch:true,
            isOffer:false
        });

        if (find.length === 0) {
            return res.status(404).json({
                message: 'No product found'
            })
        }

        const filterNewArrivals = await find.reverse().slice(0, 5);

        if (filterNewArrivals) {
            return res.status(200).json({
                message: 'NewArrivals found sucessfully',
                filterNewArrivals
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export { createProduct, applyOffer, getAllProducts, deleteProduct, getAllNewArrivals, closeOffer, getAllOffers,updateOffer }