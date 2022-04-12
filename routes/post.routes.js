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
        const pageOptions = {
            page: parseInt(req.query.start) || 0,
            limit: parseInt(req.query.limit)
        }
             Post.find().sort({ date:-1,_id: 1}).skip(pageOptions.page)
                 .limit(pageOptions.limit)
                 .exec(function (err, doc) {
                     if(err) { res.status(500).json(err); return; }
                     res.status(200).json(doc);
                 })
    }catch (e){
        res.status(500).send()
    }
})
router.get('/count',async (req,res) =>{
    try {
        Post.find()
            .count().exec(function (err, doc) {
            if(err) { res.status(500).json(err); return; }
            res.status(200).json(doc);
        });
    }catch (e){
        res.status(500).send()
    }
})
router.get('/getnewpost', async (req, res) => {
    try {
        const pageOptions = {
            page: parseInt(req.query.start) || 0,
            limit: parseInt(req.query.limit) || 10
        }
        const keywords=req.query._path
        if (keywords!==undefined){
        Post.find({ en_keywords:""+keywords }).sort({ date:-1,_id: 1})
            .skip(pageOptions.page)
            .limit(pageOptions.limit)
            .exec(function (err, doc) {
                if(err) { res.status(500).json(err); return; }
                res.status(200).json(doc);
            });
        }else {
            console.log("getpost")
        }
        } catch (e) {
        res.status(500).send()
    }
})
router.get('/getnewpost/count', async (req, res) => {
    try {
        const keywords=req.query._path

         Post.find({ en_keywords:""+keywords })
            .count().exec(function (err, doc) {
             if(err) { res.status(500).json(err); return; }
             res.status(200).json(doc);
         });
    } catch (e) {
        res.status(500).send()
    }
})
router.get('/get',async (req,res) =>{
    try {
        const keywords=req.query._path
        //console.log(keywords)
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
        const post = await Post.findById(id)
        res.json(post)
    }catch (error){
        console.log(error)
    }
})
module.exports =router