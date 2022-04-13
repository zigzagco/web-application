require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8080
app.use(cors())
app.use(express.json({extended:true}))
app.use('/api/post',require('./routes/post.routes'))


async function start(){

    try{
        await mongoose.connect(process.env.DB_HOST+'')
        app.listen(PORT,()=>{
            console.log('listning port '+ PORT)
        })
    }catch (error){
        console.log(error)
    }
}
start()
