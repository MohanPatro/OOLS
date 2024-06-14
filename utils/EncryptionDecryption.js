const CryptoJS = require('crypto-js');
module.exports = {
    async DecryptedData(data) {
        let key = process.env.JWT_SECRET;
        return new Promise((resolve, reject) => {
            const bytes = CryptoJS.AES.decrypt(data, key);
            let DecryptData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            resolve(DecryptData);
          });
    },
    async encryptedData(data) {
        let key = process.env.JWT_SECRET;
        return new Promise((resolve, reject) => {
            let encryptData = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
            resolve(encryptData);
          }); 
    },
};


