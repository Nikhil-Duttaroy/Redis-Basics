const express = require('express')
const app = express()
const axios = require('axios')
const PORT = process.env.PORT || 5000

const {Redis} = require("ioredis");
const RedisClient = new Redis()


app.get('/' , async(req , res)=>{
    RedisClient.get("photos",async (error,redisData) => {
        if(error) console.log(error)
        if(redisData !== null){
            console.log("-------FROM REDIS-------")
            return res.json(JSON.parse(redisData))
        }
        else{
            console.log("-------FROM API-------")
            const { data }=await axios.get('https://jsonplaceholder.typicode.com/photos')
            await RedisClient.setex("photos",60,JSON.stringify(data))
            return res.json(data);
        }
    });

})


app.listen(PORT , ()=> console.log('> Server is up and running on port : ' + PORT))