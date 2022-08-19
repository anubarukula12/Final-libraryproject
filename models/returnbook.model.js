const mongoose = require("mongoose");

// create schema definition
const returnbookSchemaDefinition = {
  useremail: {
    type: String,
  },
  bookid: {
    type: String,
  },
  date: {
    type: String,
  },
};
// create the schema itself
const returnBook = new mongoose.Schema(returnbookSchemaDefinition);
// create the model
const returnedBook = mongoose.model("returnBookDetails", returnBook);
// export the model to be required in our app
module.exports = returnedBook;
