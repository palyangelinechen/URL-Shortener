const mongoose = require("mongoose");
const URLSchema = mongoose.Schema({
  shortenedURL: {
    type: String,
    required: true,
    minLength: 1
  },
  originalURL: {
    type: String,
    required: true
  }
})
const URL = mongoose.model("URL", URLSchema);
module.exports = {URL}
