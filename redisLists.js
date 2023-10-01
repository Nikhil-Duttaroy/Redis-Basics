const { Redis } = require("ioredis");
const RedisClient = require("./RedisClient");

//Lists in redis can be used as stack or queue
//Stack : Insert Left -> LPUSH ; Remove Left ->LPOP
//Queue : Insert Left -> LPUSH ; Remove Right ->RPOP

const init = async () => {
  await RedisClient.lpush("email", 1);
  console.log("---Whole List---", await RedisClient.lrange("email", 0, -1));

  await RedisClient.lpush("email", 2);
  console.log("---Whole List---", await RedisClient.lrange("email", 0, -1));

  await RedisClient.lpush("email", 3);
  console.log("---Whole List---", await RedisClient.lrange("email", 0, -1));

  await RedisClient.lpush("email", 4);
  console.log("---Whole List---", await RedisClient.lrange("email", 0, -1));

  await RedisClient.lpush("email", 5);
  console.log("---Whole List---", await RedisClient.lrange("email", 0, -1));

  console.log("------RPOP------        : ", await RedisClient.rpop("email"));
  console.log("---Whole List---", await RedisClient.lrange("email", 0, -1));
  console.log("------LPOP------        : ", await RedisClient.lpop("email"));
  console.log("---Whole List---", await RedisClient.lrange("email", 0, -1));

  await RedisClient.expire("email", 60);
};

init();
