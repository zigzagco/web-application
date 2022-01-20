const {Router} = require('express')
const router = Router()
const Post = require('../models/Post')

router.post('/add',async(req,res)=>{
    try {
       const {text,title,imgUri} = req.body

        const post = new Post({
            title,text,imgUri
        })

        await post.save()
        res.json(post)
    }catch (error){
        console.log(error)
    }
})

router.get('/',async (req,res) =>{
    try {
        const posts = await Post.find()
        res.json(posts)
    }catch (error){
        console.log(error)
    }
})

router.get('/:id',async (req,res)=>{
    try {
       const {id} = req.params
        const post = await Post.findById(id)
        res.json(post)
    }catch (error){
        console.log(error)
    }
})
module.exports =router