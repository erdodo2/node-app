const { JsonDB, Config } =require('node-json-db');

const CryptoJS = require("crypto-js");
const {v4: uuidv4} = require("uuid");

const user = new JsonDB(new Config("./db/user.db", true, false, '/'));
const profile = new JsonDB(new Config("./db/profile.db", true, false, '/'));

const profileDB = {
    update: async (data) => {

    }
}


const db = {
    addList: async (data) => {

        let secretValue = CryptoJS.AES.encrypt(data, process.env.MY_SECRET_KEY).toString()
        await user.push(`/${uuidv4()}`,secretValue).then( (data) => {
            return  {status: "success"};
        }).catch( (err) => {
            return  err;
        })

    },
    getList: async () => {
        return await user.getData("/").then(async (data) => {
            let list={};
            for (const [k,v] of Object.entries(data)) {
                var bytes  = CryptoJS.AES.decrypt(v, process.env.MY_SECRET_KEY);
                var originalText = bytes.toString(CryptoJS.enc.Utf8);
                list[k]=JSON.parse(originalText)
            }
            return await list;

        }).catch((err) => {
            return err;
        })
    },
    getOne: async (id) => {
        return await user.getData(`/${id}`).then(async (data) => {
            var bytes  = CryptoJS.AES.decrypt(data, process.env.MY_SECRET_KEY);
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            return await JSON.parse(originalText);
        }).catch((err) => {
            return err;
        })
    },
    deleteOne: async (id) => {
        return await user.delete(`/${id}`).then(async (data) => {
            return await data;
        }).catch((err) => {
            return err;
        })
    },
}
module.exports = {
    db,user
};
