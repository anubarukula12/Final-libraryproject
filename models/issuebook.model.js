const mongoose = require("mongoose");

// create schema definition
const issuebookSchemaDefinition = {
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
  useremail: {
    type: String,
  },
  period: {
    type: String,
  },
  date: {
    type: String,
  },
};
// create the schema itself
const issueBook = new mongoose.Schema(issuebookSchemaDefinition);
// create the model
const issuedBook = mongoose.model("IssueBookDetails", issueBook);
// export the model to be required in our app
module.exports = issuedBook;
