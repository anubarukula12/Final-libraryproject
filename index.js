//include express and create an app
const express = require("express");
const ejs = require("ejs");
const app = express();
// using express json parser for handling json body objects
app.use(express.json());

// using express urlencoded to handle forms
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//using cors
const cors = require("cors");
app.use(cors());

// include mongoose
const mongoose = require("mongoose");
// connect to mongodb
const uri =
  "mongodb+srv://anu:anu@cluster0.lszyg.mongodb.net/libraryTables?retryWrites=true&w=majority";
const options = { useNewUrlParser: true, UseUnifiedTopology: true };

// @ts-ignore
mongoose
  .connect(uri, options)
  .catch((error) => console.error("mongoose error: ", error.message));
mongoose.connection.once("open", () => {
  //create express server
  const port = 3000;
  app.listen(port, () => {
    console.log("server started on port" + port);
  });

  console.log("mongodb connected successfully");
});
app.use("/css", express.static(__dirname + "/css"));
app.use("/images", express.static(__dirname + "/images"));
app.use("/jsfiles", express.static(__dirname + "/jsfiles"));
// //create end point - get to retrieve date -post to create date -patch to edit data
app.get("/index.html", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/register.html", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});
app.get("/studentlogin.html", (req, res) => {
  res.sendFile(__dirname + "/studentlogin.html");
});
app.get("/adminlogin.html", (req, res) => {
  res.sendFile(__dirname + "/adminlogin.html");
});
app.get("/admin.html", (req, res) => {
  res.sendFile(__dirname + "/admin.html");
});
app.get("/issuebook.html", (req, res) => {
  res.sendFile(__dirname + "/issuebook.html");
});
app.get("/returnbook.html", (req, res) => {
  res.sendFile(__dirname + "/returnbook.html");
});
app.get("/user.html", (req, res) => {
  res.sendFile(__dirname + "/user.html");
});
app.get("/viewbooks.html", (req, res) => {
  res.sendFile(__dirname + "/viewbooks.html");
});

app.get("/mybooks.html", (req, res) => {
  res.sendFile(__dirname + "/mybooks.html");
});
const registerUserModel = require("./models/registeruser.model");
const registerBookModel = require("./models/registerbook.model");
const issueBookModel = require("./models/issuebook.model");
const returnBookModel = require("./models/returnbook.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = "/users";
const books = "/books";
const issue = "/issue";
const userbooks = "/userbooks";
const userprofile = "/userprofile";
const returnb = "/returnb";
app.post(`${users}/register`, async (req, res) => {
  try {
    // route to handle the create users

    // extract request parameters
    const { firstname, lastname, email, address, password, mobileno } =
      req.body;
    console.log(firstname, lastname, email, address, password, mobileno);
    // hash the user password
    const passwordHash = await bcrypt.hash(password, 10);

    // create new user object
    if (email == "admin@gmail.com") {
      const newUserObject = {
        firstname,
        lastname,
        email,
        address,
        password: passwordHash,
        mobileno,
        role: "admin",
      };

      const newUser = new registerUserModel(newUserObject);

      await newUser.save();

      res.send({ success: true, message: "Registered successful" });
    } else {
      const newUserObject = {
        firstname,
        lastname,
        email,
        address,
        password: passwordHash,
        mobileno,
        role: "user",
      };

      const newUser = new registerUserModel(newUserObject);

      await newUser.save();

      res.send({ success: true, message: "Registered successful" });
    }
  } catch (error) {
    console.error("create user error: ", error.message);
    res.status(500).send(`error while creating user. ${error.message}`);
  }
});

app.get(`${users}/userprofile/:email`, async (req, res) => {
  try {
    // extract uri params
    console.log("hi", req.params.email);
    //  const ObjectId = require("mongodb").ObjectId;
    //   const id = ObjectId(req.params.id);
    const user = await registerUserModel.findOne({ email: req.params.email });

    console.log(user);
    // close the request response cycle
    res.send(user);
  } catch (error) {
    // handle errors and exceptions
    const errorString = `error getting users ${error.message}`;
    console.error(errorString);
    res.status(500).send(errorString);
  }
});
app.get(`${users}/bookprofile/:email`, async (req, res) => {
  try {
    // extract uri params
    console.log("hi in book profile", req.params.email);
    //  const ObjectId = require("mongodb").ObjectId;
    //   const id = ObjectId(req.params.id);
    const useremail = req.params.email;

    console.log(useremail);
    const booklist = await issueBookModel.findOne({ useremail: useremail });

    console.log(booklist);
    // close the request response cycle
    res.send(booklist);
  } catch (error) {
    // handle errors and exceptions
    const errorString = `error getting users ${error.message}`;
    console.error(errorString);
    res.status(500).send(errorString);
  }
});
app.get("/books", (req, res) => {
  registerBookModel.find({}, function (err, books) {
    res.render("viewbooks", {
      booksList: books,
    });
  });
});
app.get("/userbooks", (req, res) => {
  registerBookModel.find({}, function (err, userbooks) {
    res.render("viewusersbooks", {
      booksList: userbooks,
    });
  });
});
app.get("/users", (req, res) => {
  registerUserModel.find({}, function (err, users) {
    res.render("viewusers", {
      usersList: users,
    });
  });
});
app.get("/issue", (req, res) => {
  issueBookModel.find({}, function (err, issue) {
    res.render("viewissuebooks", {
      issueList: issue,
    });
  });
});

app.post(`${users}/studentlogin`, async (req, res) => {
  try {
    // extract params
    const { email, password } = req.body;

    // find out if there is a user with this email
    const user = await registerUserModel.findOne({ email }).exec();
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "wrong email or Password" });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res
        .status(401)
        .send({ success: false, message: "wrong email or Password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      "oNZpSj2XRak9EF86"
    );

    res
      .header("x-auth-token", [token, user.email, user.role])
      .send({ success: true, message: "login successful" });
  } catch (error) {
    // handle errors and exceptions
    const errorString = `error login users ${error.message}`;
    console.error(errorString);
    res.status(500).send(errorString);
  }
});
app.post(`${users}/adminlogin`, async (req, res) => {
  try {
    // extract params
    const { email, password } = req.body;

    // find out if there is a user with this email
    const user = await registerUserModel.findOne({ email }).exec();
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "wrong email or Password" });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res
        .status(401)
        .send({ success: false, message: "wrong email or Password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      "oNZpSj2XRak9EF86"
    );

    res
      .header("x-auth-token", [token, user._id, user.role])
      .send({ success: true, message: "login successful" });
  } catch (error) {
    // handle errors and exceptions
    const errorString = `error login users ${error.message}`;
    console.error(errorString);
    res.status(500).send(errorString);
  }
});

app.post(`${books}/details`, async (req, res) => {
  try {
    // route to handle the create users

    // extract request parameters

    const { bookid, bookname, genre, price } = req.body;
    console.log(bookname, genre, price, bookid);
    const newUserObject = {
      bookid,
      bookname,
      genre,
      price,
    };

    const newUser = new registerBookModel(newUserObject);

    await newUser.save();

    res.send({ success: true, message: "Registered successful" });
  } catch (error) {
    console.error("create user error: ", error.message);
    res.status(500).send(`error while creating user. ${error.message}`);
  }
});
app.post(`${issue}/books`, async (req, res) => {
  try {
    // route to handle the create users

    // extract request parameters

    const { bookid, useremail, period, date } = req.body;
    console.log(bookid, useremail, period, date);

    const bookdetails = await registerBookModel.findOne({ bookid: bookid });
    console.log("bookdetails", bookdetails.bookid);
    const bookname = bookdetails.bookname;
    const genre = bookdetails.genre;
    const price = bookdetails.price;

    await registerBookModel.findOneAndDelete(bookid);
    const newUserObject = {
      bookid,
      bookname,
      genre,
      price,
      useremail,
      period,
      date,
    };
    const newUser = new issueBookModel(newUserObject);

    await newUser.save();

    res.send({ success: true, message: "Registered successful" });
  } catch (error) {
    console.error("create user error: ", error.message);
    res.status(500).send(`error while creating user. ${error.message}`);
  }
});
app.post(`${returnb}/issuedbooks`, async (req, res) => {
  try {
    // route to handle the create users

    // extract request parameters
    const { bookid, useremail, date } = req.body;
    console.log(bookid, useremail, date);
    const bookdetails = await issueBookModel.findOne({ bookid: bookid });
    console.log(bookdetails);
    const issuebookobject = {
      bookid: bookdetails.bookid,
      bookname: bookdetails.bookname,
      genre: bookdetails.genre,
      price: bookdetails.price,
    };
    const bookUser = new registerBookModel(issuebookobject);
    await bookUser.save();
    const newUserObject = {
      bookid,
      useremail,
      date,
    };

    await issueBookModel.findOneAndDelete(bookid);

    const newUser = new returnBookModel(newUserObject);

    await newUser.save();

    res.send({ success: true, message: "Registered successful" });
  } catch (error) {
    console.error("create user error: ", error.message);
    res.status(500).send(`error while creating user. ${error.message}`);
  }
});
