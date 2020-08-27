const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.get("/", (req, res) => {
  //renders file 'login' in folder 'layouts'
  //moved login so that it renders when arrive at site
  res.render("layouts/login");
});

//allows the user to 'land' on the register page
//otherwise cannot get/register
router.get("/register", (req, res) => {
  res.render("layouts/register");
});

router.post("/register", async (req, res) => {
  let name = req.body.username;
  let email = req.body.email;
  let userPassword = req.body.password;
  //Here there needs to be an if statement for if email is already taken.

  const salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash(userPassword, salt);
  let user = new User({
    name: name,
    email: email,
    password: password,
  });
  user.save();
  //render user name
  res.render("layouts/login");
});

router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne(
    {
      email: email,
    },
    async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        //if data was available then email matches an email in database
        if (data) {
          let name = data.name;
          let hashedPassword = data.password;
          let _id = data._id;
          const matched = await bcrypt.compare(password, hashedPassword);

          // the hash can then retrieve the information
          // it returns true or false
          if (matched) {
            res.render("layouts/username", {
              name: name,
              _id: _id,
            });
          } else {
            //passes message to ejs when hits get('/login')
            //first parameter is key, second is value
            //correspond to global variables declared in server
            req.flash("error", "password does not match our records");
            res.redirect("/");
          }
        } else {
          //no data available, so user does not exist
          req.flash("error", "We do not have that email in our records");
          res.redirect("/");
        }
      }
    }
  );
});

//allows user to 'land' on profile page
//renders form to update user name and enmail
router.get("/update/:id", (req, res) => {
  let id = req.params.id;
  User.findById(
    {
      _id: id,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.render("layouts/update-profile", {
          id: id,
        });
      }
    }
  );
});

//Allows user to update name or email
router.post("/update/:id", async (req, res) => {
  let id = req.params.id;
  let newName = req.body.newname;
  let newEmail = req.body.email;
  let currentUser = await User.findById({
    _id: id,
  });
  if (
    (!newName && !newEmail) ||
    (newName === currentUser.name && newEmail === currentUser.email) ||
    (!newName && email === currentUser.email) ||
    (newName === currentUser.name && !newEmail)
  ) {
    User.findById({ _id: id }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let id = data._id;
        let name = data.name;
        let email = data.email;
        res.render("layouts/landing", {
          id,
          name,
          email,
        });
      }
    });
  }
  if (
    newName &&
    newName !== currentUser.name &&
    newEmail &&
    newEmail !== currentUser
  ) {
    User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          name: newName,
          email: newEmail,
        },
      },
      {
        new: true,
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let id = data._id;
          let name = data.name;
          let email = data.email;
          res.render("layouts/landing", {
            id,
            name,
            email,
          });
        }
      }
    );
  }
  if (newName && newName !== currentUser.name && !newEmail) {
    User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          name: newName,
        },
      },
      {
        new: true,
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let id = data._id;
          let name = data.name;
          let email = data.email;
          res.render("layouts/landing", {
            id,
            name,
            email,
          });
        }
      }
    );
  }
  if (newEmail && newEmail !== currentUser.email && !newName) {
    User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          email: newEmail,
        },
      },
      {
        new: true,
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let id = data._id;
          let name = data.name;
          let email = data.email;
          res.render("layouts/landing", {
            id,
            name,
            email,
          });
        }
      }
    );
  }
});

//removes user
router.get("/removeUser/:id", (req, res) => {
  let id = req.params.id;
  User.findByIdAndRemove(
    {
      _id: id,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        req.flash("success", "Profile deleted");
        console.log(data);
        res.redirect("/");
      }
    }
  );
});

module.exports = router;
