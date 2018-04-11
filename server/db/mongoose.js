const mongoose = require("mongoose");
mongoose.Peromise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/URLShortener");
module.exports = {mongoose}
