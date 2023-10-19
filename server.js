const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const database = {
  users: [
    {
      id: "122",
      name: "Wajiha",
      email: "wajiha@gmail.com",
      password: "1234",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
  // login: [
  //   {
  //     id: "987",
  //     hash: "",
  //     email: "john@gmail.com",
  //   },
  // ],
};
// HOME ROOT
app.get("/", (req, res) => {
  //   res.send("this is working 12");
  res.send(database.users);
});

// SIGN IN
app.post("/signin", (req, res) => {
  // Load hash from your password DB.
  //   bcrypt.compare(
  //     "cookies12",
  //     "$2a$10$6W/TZdQa1/FGjhEPMS3mwObgvKyVwfBb.bKkbxMejlM/qWgtkead6",
  //     function (err, res) {
  //       // res == true
  //       console.log("first guess: ", res);
  //     }
  //   );
  //   bcrypt.compare(
  //     "cookies12",
  //     "$2a$10$6W/TZdQa1/FGjhEPMS3mwObgvKyVwfBb.bKkbxMejlM/qWgtkead6",
  //     function (err, res) {
  //       // res = false
  //       console.log("second guess: ", res);
  //     }
  //   );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
  //   res.json("signing");
});

// REGISTER
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  //   bcrypt.hash(password, null, null, function (err, hash) {
  //     // Store hash in your password DB.
  //     console.log(hash);
  //   });

  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

// PROFILE
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).res.json("no such user");
  }
});

// IMAGE
app.post("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).res.json("no such user");
  }
});
// --------------------------------

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function (err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function (err, res) {
//   // res = false
// });
// -------------------------------
app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/*

/signIn --> POST = success/ fail
/register --> POST = user
/profile/:user:Id --> GET = user
/image --> PUT --> user
*/
