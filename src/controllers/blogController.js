const authorModel = require("../models/authorModel.js")
const blogModel = require("../models/blogModel.js")

const mongoose = require("mongoose")

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

const getBlogs = async function (req, res) {
    try {
        let blogs = await blogModel.find({ isdeleted : false }, { ispublished: true })
        console.log(blogs)
        if (blogs) {
            
            res.status(200).send({ status: true, data:blogs  })
        } else {
            res.status(400).send({ status: false, msg: "no blogs " })
        }


    }
    catch {
        res.status(500).send({ status: false, msg: "error" })
    }
}

const updateBlog = async function (req, res) {
    try {
        const blogId = req.params.blogId
        // const {title, body, tags, category, subcategory, isPublished} = req.Body
        let title = req.body.title
        let body = req.body.body
        let tags = req.body.tags
        let subcategory = req.body.subcategory
        let isPublished = req.body.isPublished
        const updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { title:title,body:body,tags:tags,subcategory:subcategory,isPublished:isPublished }, { new: true })
        res.status(200).send({ status: true, message: 'Blog updated successfully', data: updatedBlog });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message });
    }
}
//delete 
const checkdeletestatus = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let deletedblogs = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { isDeleted: true })
        if (deletedblogs) {
            res.status(200).send({msg:"deleted"})
        }
        else {
            res.status.send({ msg: "invalid blogId" })
        }
    }
    catch (error) {
        res.status(500).send({ err: error })
    }
}
//delete by params
const deletebyparams = async function (req, res) {
    try {
        let category = req.query.category
        let authorId = req.query.authorId
        let tagname = req.query.tagname
        let subcategory = req.query.subcategory
        let unpublished = req.query.unpublished
        let deletebydetails = await blogModel.findOneAndUpdate({ _id: authorId, isDeleted: false }, { isDeleted: true })
        if (deletebydetails) {
            res.status(404).send({ msg: "Document is deleted" })
        }
    }
    catch {
        res.status(500).send()
    }
}


module.exports.createBlogs = createBlogs;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.checkdeletestatus = checkdeletestatus;
module.exports.deletebyparams = deletebyparams;
