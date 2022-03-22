const {Router} = require('express')
const router = Router()
const Post = require('../models/Post')
const Dir = require('../models/Dir')

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
        const keywords=req.query._path
        let posts
        if (keywords!=null){
            posts = await Post.find({ en_keywords:""+keywords } )
        }else {
             posts = await Post.find()
        }
        res.json(posts)

    }catch (error){
        console.log(error)
    }
})
router.get('/get',async (req,res) =>{
    try {
        const keywords=req.query._path
        console.log(keywords)
        let dir
        if (keywords!=null){
            dir = await Dir.findOne({en_keywords: ""+keywords})
            res.json(dir)
        }else {
            res.status(404)
        }
    }catch (error){
        console.log(error)
    }
})
router.get('/:id',async (req,res)=>{
    try {
       const {id} = req.params
        console.log(req.params + " -- "+id)
        const post = await Post.findById(id)
        res.json(post)
    }catch (error){
        console.log(error)
    }
})
module.exports =router