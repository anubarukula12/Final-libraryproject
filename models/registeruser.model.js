const mongoose = require("mongoose");

// create schema definition
const registeruserSchemaDefinition = {

  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  mobileno: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
  },
};
// create the schema itself
const registerUser = new mongoose.Schema(registeruserSchemaDefinition);
// create the model
const registeredUser = mongoose.model("User", registerUser);
// export the model to be required in our app
module.exports = registeredUser;
