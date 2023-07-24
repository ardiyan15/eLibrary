const { createClient } = require("redis");

module.exports = async (key, value = "") => {
  const client = createClient();

  client.on("error", (err) => {
    console.log("Redis Client Error", err);
    process.exit();
  });

  await client.connect();
  const isExist = await client.exists(key);
  if (isExist !== 1) {
    await client.set(key, value);
  }
  const result = await client.get(key);
  await client.disconnect();

  return result;
};
