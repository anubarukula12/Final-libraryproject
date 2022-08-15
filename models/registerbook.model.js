const mongoose = require("mongoose");

// create schema definition
const registerbookSchemaDefinition = {
  bookid: {
    type: String,
  },
  bookname: {
    type: String,
  },
  genre: {
    type: String,
  },
  price: {
    type: Number,
  },
};
// create the schema itself
const registerBook = new mongoose.Schema(registerbookSchemaDefinition);
// create the model
const registeredBook = mongoose.model("BookDetails", registerBook);
// export the model to be required in our app
module.exports = registeredBook;
