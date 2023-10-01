const RedisClient=require('./RedisClient')

const init = async(key,value) => {
    //setex : expire the key after setting after some time.
    await RedisClient.setex(`${key}`,10,value)
    console.log(await RedisClient.get(`${key}`))
}

init("user:1","jhon doe")
