const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const urlBase = "mongodb://localhost:27017/evalExpress"


mongoose.connect(urlBase, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose