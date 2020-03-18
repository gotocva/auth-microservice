 
const Cryptr = require('cryptr');
const env = require("./env");
const cryptr = new Cryptr(env.secret);

const encrypt = (str) => {
    return cryptr.encrypt(str.toString())
};

const decrypt = (str) => {
    return cryptr.decrypt(str);
};

const getTimeDifference = (dateTime) => {
    const date1 = new Date(dateTime);
    const date2 = new Date();
    const res = Math.abs(date1 - date2) / 1000;
    return Math.floor(res / 60) % 60;
};

const expirationTime = () => {
    const current = new Date();
    return new Date(current + env.timeout * 60000).getTime();
}

module.exports = { encrypt, decrypt, getTimeDifference, expirationTime }