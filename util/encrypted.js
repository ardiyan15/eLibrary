const CryptoJs = require("crypto-js");
const password = "123456";

const encrypt = (data, key) => {
  let content = data.toString();
  let cipherText = CryptoJs.AES.encrypt(content, password);
  return encodeURIComponent(cipherText);
};

const decrypt = (data, key) => {
  let bytes = CryptoJs.AES.decrypt(decodeURIComponent(data), password);
  let originalText = bytes.toString(CryptoJs.enc.Utf8);

  return originalText;
};

module.exports = { encrypt, decrypt };
