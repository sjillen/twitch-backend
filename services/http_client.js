const axios = require('axios');

module.exports = {
    async get(url, options) {
        return await axios.get(url, options);
    },

    async post(url, data, options) {
        return await axios.post(url, data, options);
    },
};
