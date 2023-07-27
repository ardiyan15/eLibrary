const { createClient } = require("redis");

module.exports = async (key, value = "", type = "get") => {
  const client = createClient();

  client.on("error", (err) => {
    console.log("Redis Client Error", err);
    process.exit();
  });

  await client.connect();
  if (type === "set") {
    await client.set(key, value);
  }
  const result = await client.get(key);
  await client.disconnect();

  return result;
};
