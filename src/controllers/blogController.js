const authorModel = require("../models/authorModel.js")
const blogModel = require("../models/blogModel.js")

const mongoose = require("mongoose")
//create blogs
const createBlogs = async function (req, res) {
    try {
        let blog = req.body
        let blogId = req.body.authorId
        let authorId = await authorModel.findById(blogId)
        if (authorId) {
            let savedBlogs = await blogModel.create(blog)
            res.status(201).send({ status: true, data: savedBlogs })
        } else {
            res.status(400).send({ status: false, msg: "invalid id" })
        }
    }
    catch {
        res.status(500).send({ status: false, msg: "error" })
    }
}
//get blog
const getBlogs = async function (req, res) {
    try {
        const blogs = await blogModel.find({ isDeleted: false, isPublished: true })
        let authorId = req.query.authorid
        let category = req.query.category
        let tags = req.query.tags
        let subcategory = req.query.subcategory
        if (blogs) {

            let check = await blogModel.find({ $or: [{ authorId: authorId }, { tags: [tags] }, { category: category }, { subcategory: [subcategory] }] });

            if (check) {
                return res.status(200).send({ status: true, data: check })
            } else {
                res.status(401).send({ status: false, msg: "invalid details" })
            }


        } else {
            res.status(400).send({ status: false, msg: "invalid blog" })
        }
    } catch {
        res.status(500).send({ status: false, error })
    }
}

// update blog

const updateBlog = async function (req, res) {
    try {
        const blogId = req.params.blogId
        // const {title, body, tags, category, subcategory, isPublished} = req.Body
        let title = req.body.title
        let body = req.body.body
        let tags = req.body.tags
        let subcategory = req.body.subcategory
        let isPublished = req.body.isPublished
        const updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, {
            title: title, body: body, isPublished: isPublished,
            $push: { tags: tags }, $push: { subcategory: subcategory }
        }, { new: true })

        res.status(200).send({ status: true, message: 'Blog updated successfully', data: updatedBlog });
    } catch {

        res.status(500).send({ status: false, message: "error.message" });
    }
}
//delete 
const checkdeletestatus = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let deletedblogs = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { isDeleted: true })
        if (deletedblogs) {
            res.status(200).send({ status: true, msg: "successfully deleted" })
        }
        else {
            res.status(400).send({ status: false, msg: "invalid blogId" })
        }
    }
    catch {
        res.status(500).send({ status: false, msg: "error" })
    }
}
//delete by params
const deletebyparams = async function (req, res) {
    try {
        let category = req.query.category
        let authorId = req.query.authorId
        let tags = req.query.tags
        let subcategory = req.query.subcategory
        let unpublished = req.query.unpublished

        let deleteByDetails = await blogModel.findOneAndUpdate({

            authorId: authorId, category: category, tags: tags

            , subcategory: subcategory, ispublished: unpublished, isDeleted: false

        }, { isDeleted: true, deletedAt: new Date() })

        if (deleteByDetails) {
            res.status(404).send({ status: true, msg: "Document is deleted" })
        } else {
            res.status(400).send({ status: false, msg: "invalid detailes" })
        }
    }
    catch {
        res.status(500).send({ status: false, msg: "error" })
    }

}

module.exports.createBlogs = createBlogs;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.checkdeletestatus = checkdeletestatus;
module.exports.deletebyparams = deletebyparams