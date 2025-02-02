const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render('blogs/index.ejs', { blogs : currentUser.blogs })
        
    } catch (error) {
        res.redirect('/')
    }
})

router.get('/new', async (req, res) => {
    res.render('blogs/new.ejs')
})

router.post('/', async (req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.blogs.push(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/blogs`)
    } catch (error) {
        res.redirect('/')
    }
})

router.get('/:blogId', async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id)
        const blog = currentUser.blogs.id(req.params.blogId)
        res.render('blogs/show.ejs', {
            blog: blog
        })
    } catch (error) {
        res.redirect('/')
    }
})

router.delete('/:blogId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.blogs.id(req.params.blogId).deleteOne()
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/blogs/`)
    } catch (error) {
        res.redirect('/')
    }
})

router.get('/:blogId/edit', async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id)
        const blog = currentUser.blogs.id(req.params.blogId)
        res.render('blogs/edit.ejs', {
            blog: blog
        })
    } catch (error) {
        res.redirect('/')
    }
})

router.put('/:blogId', async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id)
        const blog = currentUser.blogs.id(req.params.blogId)
        blog.set(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/blogs/${req.params.blogId}`)
    } catch (error) {
        res.redirect('/')
    }
})
module.exports = router
